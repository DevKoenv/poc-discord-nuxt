import type { icons } from 'lucide-vue-next';

interface NavigationItem {
  title: string;
  icon: icons;
  href: string;
  badge?: number;
  external?: boolean;
}

export interface NavigationProps {
  items: NavigationItem[];
}
