import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  LucideIcon,
} from 'lucide-react';

interface SocialLink {
  id: number;
  icon: LucideIcon;
  href: string;
  name: string;
  hoverColor: string;
}

const socialLinks: SocialLink[] = [
  {
    id: 1,
    icon: Facebook,
    href: 'https://facebook.com',
    name: 'Facebook',
    hoverColor: 'hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200',
  },
  {
    id: 2,
    icon: Twitter,
    href: 'https://twitter.com',
    name: 'Twitter',
    hoverColor: 'hover:bg-sky-50 hover:text-sky-600 hover:border-sky-200',
  },
  {
    id: 3,
    icon: Instagram,
    href: 'https://instagram.com',
    name: 'Instagram',
    hoverColor: 'hover:bg-pink-50 hover:text-pink-600 hover:border-pink-200',
  },
  {
    id: 4,
    icon: Linkedin,
    href: 'https://linkedin.com',
    name: 'Linkedin',
    hoverColor: 'hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200',
  },
];

export const SocialMediaLinks = () => {
  return (
    <div className='bg-card rounded-xl p-8 shadow-lg border border-border/50 backdrop-blur-sm '>
      <h3 className='text-2xl font-bold text-foreground mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text '>
        Connect With Us
      </h3>
      <div className='flex gap-4 items-center justify-center flex-wrap'>
        {socialLinks.map((social) => (
          <a
            key={social.id}
            href={social.href}
            className={`relative group bg-background p-4 rounded-xl border border-border/50
                       shadow-sm transition-all duration-300 ease-in-out
                       hover:shadow-lg hover:-translate-y-1 ${social.hoverColor}`}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={social.name}
          >
            <social.icon className='h-4 w-4 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:scale-110' />
            <span
              className='absolute -bottom-8 left-1/2 -translate-x-1/2 
                           opacity-0 group-hover:opacity-100 transition-opacity duration-300
                           text-xs font-medium text-muted-foreground whitespace-nowrap'
            >
              {social.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
