import type { icons } from 'lucide-vue-next';

export interface NavigationItem {
  title: string;
  icon: icons;
  href: string;
  badge?: number;
  external?: boolean;
}

export interface NavigationProps {
  items: NavigationItem[];
}
