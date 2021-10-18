import React from 'react'
import { useForm } from 'react-hook-form'

// Action creators
import { logIn, logOut } from '#models/user'

// Components
import { Form } from '#components/form-constructor/Form'
import { FormRow } from '#components/form-constructor/FormRow'
import { PlainInput } from '#components/form-constructor/PlainInput'
import { Button } from '#components/Button'

// Utils
import { useAppDispatch, useAppSelector } from '#utils/hooks'

// Styles
import s from './index.module.css'

// Types
import { SubmitHandler } from 'react-hook-form'
import { IUser } from '#interfaces/user'

export const Login = () => {
	const dispatch = useAppDispatch()

	const { isUserLoggedIn, userData } = useAppSelector((state) => state.user)

	const { register, handleSubmit } = useForm<IFormValues>()

	const submitLogin: SubmitHandler<IFormValues> = async ({ password, username }) => {
		dispatch(logIn({ password, username }))
	}

	if (isUserLoggedIn) {
		return (
			<div className={s.Container}>
				<p className={s.Centered}>
					You are logged in as <strong>{userData.username}</strong>.
				</p>

				<Button color="red" onClick={() => dispatch(logOut())}>
					Log out
				</Button>
			</div>
		)
	}

	return (
		<div className={s.Container}>
			<h1 className={s.Centered}>Welcome</h1>

			<Form onSubmit={handleSubmit(submitLogin)}>
				<FormRow label="Username">
					<PlainInput {...register('username', { required: true })} />
				</FormRow>

				<FormRow label="Password">
					<PlainInput type="password" {...register('password', { required: true })} />
				</FormRow>

				<Button type="submit">Log in</Button>
			</Form>
		</div>
	)
}

type IFormValues = Pick<IUser, 'password' | 'username'>
