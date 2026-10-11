interface Info {
  title: string
  sub: string
  blocks: string[]
}

// Starter text. Have the client's legal advisor review privacy, terms, cookies and disclaimer before launch.
export const INFO: Record<string, Info> = {
  about: {
    title: 'About Kickline', sub: 'Free tips, honest results.',
    blocks: [
      'Kickline publishes daily predictions for football, basketball, hockey and handball, each with odds and a win probability.',
      '## How we work',
      'Every tip is logged and marked won or lost, so you can judge us on the record and not on claims. We do not sell guaranteed wins because nobody can.',
      '## What we are',
      'Kickline is an information site. We are not a betting operator and we do not take bets.',
    ],
  },
  contact: {
    title: 'Contact us', sub: 'We reply within 24 hours.',
    blocks: [
      '## Email',
      'General: hello@kickline.example',
      'Advertising: advertise@kickline.example',
      '## Messaging',
      'Telegram: @kickline',
      'WhatsApp only: +000 000 000 0000',
    ],
  },
  advertise: {
    title: 'Advertise with us', sub: 'Reach people who are actively looking at football tips.',
    blocks: [
      '## Placements',
      'Top banner (728x90 on desktop, 320x100 on mobile), in-feed banner between prediction groups, footer banner above the join section, and a mobile sticky bar (320x50).',
      '## How to book',
      'Email advertise@kickline.example with your brand, target market and budget. We only accept ads from operators that are licensed in the markets they target.',
    ],
  },
  privacy: {
    title: 'Privacy policy', sub: 'What we collect and why.',
    blocks: [
      '## What we collect',
      'Basic analytics such as pages viewed, device type and approximate location. We do not ask you to create an account.',
      '## Cookies and ads',
      'We and our advertising partners may use cookies. See the cookie policy for details.',
      '## Your rights',
      'Contact us to ask what we hold about you or to have it removed.',
    ],
  },
  terms: {
    title: 'Terms and conditions', sub: 'The rules for using this site.',
    blocks: [
      '## Use of the site',
      'By using Kickline you confirm you are 18 or over and legally allowed to view betting content where you live.',
      '## No guarantees',
      'Tips are opinions, not promises. We accept no liability for losses.',
      '## Links',
      'Some links go to third-party sites and some earn us a commission. We do not control their content.',
    ],
  },
  disclaimer: {
    title: 'Disclaimer', sub: 'Please read before you bet.',
    blocks: [
      '## Not advice',
      'All content is for information and entertainment. Predictions are guides, not guarantees.',
      '## Affiliate disclosure',
      'Some links on this site are affiliate links. We may earn a commission at no extra cost to you.',
      '## Play responsibly',
      'Never bet more than you can afford to lose. 18+ only.',
    ],
  },
  cookies: {
    title: 'Cookie policy', sub: 'How cookies are used here.',
    blocks: [
      '## What cookies do',
      'Cookies help the site remember your theme choice and measure how it is used. Advertising partners may set their own cookies.',
      '## Your choices',
      'You can block or delete cookies in your browser settings. The site still works without them.',
    ],
  },
  'responsible-gambling': {
    title: 'Responsible gambling', sub: 'Keep it fun.',
    blocks: [
      '## Stay in control',
      'Set a budget before you play and stick to it. Never chase losses and never bet money you need for bills.',
      '## Get free help',
      'BeGambleAware, GamCare and Gambling Therapy offer free, confidential support. If gambling stops being fun, reach out.',
      '## Age',
      'You must be 18 or over to use this site.',
    ],
  },
}
