import type { IconName } from '@/types/IconName'

export type NavRouteName =
    | 'home'
    | 'career'
    | 'interests'
    | 'competences'
    | 'projects'
    | 'contact'
    | 'credits'

export type NavItem = {
    name: NavRouteName
    label: string
    icon: IconName
    /** Secondary items are moved into the "More" menu of the mobile bottom bar */
    secondary?: boolean
}

/** Main navigation, in desktop order */
export const navItems: NavItem[] = [
    { name: 'home', label: 'Accueil', icon: 'house' },
    { name: 'career', label: 'Parcours', icon: 'briefcase' },
    { name: 'interests', label: "Centres d'intérêt", icon: 'heart', secondary: true },
    { name: 'competences', label: 'Compétences', icon: 'code-xml' },
    { name: 'projects', label: 'Projets', icon: 'folder-open' },
    { name: 'contact', label: 'Contact', icon: 'mail' },
    { name: 'credits', label: 'Crédits', icon: 'book-open-text', secondary: true },
]

export const primaryNavItems = navItems.filter((item) => !item.secondary)
export const secondaryNavItems = navItems.filter((item) => item.secondary)

/** Page order on mobile, as displayed by the bottom bar then its "More" menu */
export const mobileNavOrder: NavRouteName[] = [...primaryNavItems, ...secondaryNavItems].map(
    (item) => item.name,
)
