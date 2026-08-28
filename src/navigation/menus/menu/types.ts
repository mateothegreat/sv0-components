export interface MenuItem {
  label: string;
  href?: string;
  icon?: string;
  children?: MenuItem[];
}

export interface MenuSection {
  title: string;
  description: string;
  items: MenuItem[];
}

export interface DropdownContent {
  featured?: {
    title: string;
    description: string;
    href: string;
    image?: string;
  };
  sections: MenuSection[];
}

export interface NavigationItem {
  label: string;
  href?: string;
  dropdown?: DropdownContent;
}

export interface NavigationMenuProps {
  /**
   * The brand/logo configuration
   */
  brand: {
    href: string;
    logo?: string;
    name: string;
  };
  /**
   * Main navigation items
   */
  items: NavigationItem[];
  /**
   * Show login button
   */
  showLogin?: boolean;
  /**
   * Login button href
   */
  loginHref?: string;
  /**
   * Login button text
   */
  loginText?: string;
  /**
   * Mobile menu aria label
   */
  mobileMenuLabel?: string;
}
