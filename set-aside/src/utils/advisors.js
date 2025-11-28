// 5人の心に寄り添うアドバイザー

export const advisors = [
  {
    id: 1,
    name: '優しい声',
    emoji: '🤍',
    style: 'gentle'
  },
  {
    id: 2,
    name: '温かい光',
    emoji: '✨',
    style: 'gentle'
  },
  {
    id: 3,
    name: '静かな風',
    emoji: '🍃',
    style: 'calm'
  },
  {
    id: 4,
    name: '穏やかな水',
    emoji: '💧',
    style: 'calm'
  },
  {
    id: 5,
    name: '優しい夜',
    emoji: '🌙',
    style: 'gentle'
  }
]

export function getRandomAdvisor() {
  return advisors[Math.floor(Math.random() * advisors.length)]
}
