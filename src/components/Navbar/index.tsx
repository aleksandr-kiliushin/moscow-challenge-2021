import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router'
import cx from 'classnames'

// Components
import { Svg } from '#components/Svg'

// Utils
import { useAppSelector } from '#utils/hooks'

// Styles
import s from './index.module.css'

// Types
import { ISvgProps } from '#components/Svg'

export const Navbar = () => {
	const { pathname } = useLocation()

	const { isUserLoggedIn } = useAppSelector((state) => state.user)

	if (!isUserLoggedIn) return null

	const sectionsData: ISection[] = [
		{ path: '/', svgName: 'home' },
		{ path: '/records', svgName: 'box' },
		{ path: '/stats', svgName: 'chart-up' },
		{ path: '/settings', svgName: 'gear' },
		{ path: '/login', svgName: 'person' },
	]

	const sectionsDataForLayout = sectionsData.map(({ path, svgName }) => ({
		className: cx({ [s.SectionLink]: true, [s.ActiveSectionLink]: pathname === path }),
		path,
		svgName,
	}))

	return (
		<nav className={s.Navbar}>
			{sectionsDataForLayout.map(({ path, className, svgName }) => (
				<Link className={className} key={path} to={path}>
					<Svg name={svgName} />
				</Link>
			))}
		</nav>
	)
}

interface ISection {
	path: string
	svgName: ISvgProps['name']
}
