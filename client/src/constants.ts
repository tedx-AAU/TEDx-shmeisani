import type {
  Speaker,
  ScheduleItem,
  Partner,
  TeamMember,
  Organizer,
} from '../types';

// Import speaker images
import speaker1 from './assets/images/10.jpg';
import speaker2 from './assets/images/8.jpg';
import speaker3 from './assets/images/7.jpg';
import speaker4 from './assets/images/6.jpg';
import speaker5 from './assets/images/3.jpg';
import speaker6 from './assets/images/1.jpg';
import speaker7 from './assets/images/11.jpg';
import speaker8 from './assets/images/4.jpg';
import speaker9 from './assets/images/2.jpg';
import speaker10 from './assets/images/9.jpg';
import speaker11 from './assets/images/haytham.jpg';
import speaker12 from './assets/images/29.jpg';

// Import team member images
import organizerImg from './assets/images/24.jpg';
import organizerImg2 from './assets/images/MOmari.png';
import team1 from './assets/images/25.jpg';
import team2 from './assets/images/13.jpg';
import team3 from './assets/images/12.jpg';
import team4 from './assets/images/19.jpg';
import team5 from './assets/images/20.jpg';
import team6 from './assets/images/21.jpg';
import team7 from './assets/images/22.jpg';
import team8 from './assets/images/23.jpg';
import team9 from './assets/images/17.jpg';
import team10 from './assets/images/15.jpg';
import team11 from './assets/images/18.jpg';
import team12 from './assets/images/16.jpg';
import team13 from './assets/images/29.jpg';

// Import partner logos
import partnerGold1 from './assets/images/31.png';
import partnerGold5 from './assets/images/Cpartner.png';
import partnerGold2 from './assets/images/32.png';
import partnerGold3 from './assets/images/33.png';
import partnerGold4 from './assets/images/34.jpeg';
import partnerSilver1 from './assets/images/35.jpeg';
import partnerSilver2 from './assets/images/36.jpeg';
import partnerSilver3 from './assets/images/42.jpeg';
import partnerMedia2 from './assets/images/38.jpeg';
import partnerGold6 from './assets/images/37.png';
import partnerGold7 from './assets/images/46.png';
import partnerGold8 from './assets/images/30.jpeg';
import partnerGold9 from './assets/images/28.jpg';
import partnerGold10 from './assets/images/27.jpg';
import partnerGold11 from './assets/images/26.jpg';
import partnerGold12 from './assets/images/14.jpg';
import partnerGold13 from './assets/images/5.jpg';

export const SPEAKERS: Speaker[] = [
  {
    id: '1',
    name: 'Haneen Tamimi',
   title:
      '',
    speechTitle:
      '',
    bio: '',
    imageUrl: speaker1,
    category: '',
  },
  {
    id: '2',
    name: 'Farah Owais',
    title: '',
    speechTitle:
      '',
    bio: '',
    imageUrl: speaker2,
    category: '',
  },
  {
    id: '3',
    name: 'Mohammad Nabhan',
    title:
      '',
    speechTitle:
      '',
    bio: '',
    imageUrl: speaker3,
    category: '',
   
  },
  {
    id: '4',
    name: 'Wesam Alkaresheh',
    title:
      '',
    speechTitle: '',
    bio: '',
    imageUrl: speaker4,
    category: '',
  },
 
  {
    id: '5',
    name: 'Selena Rabab’ah',
    title: '',
    speechTitle: '',
    bio: '',
    imageUrl: speaker5,
    category: '',
  },
 

  {
    id: '6',
    name: 'Hamza Abu Khdair',
    title:
      '',
    speechTitle: '',
    bio: '',
    imageUrl: speaker10,
    category: '',
  },
  
  {
    id: '7',
    name: 'Hamza Alkhlaifat',
    title:
      '',
    speechTitle:
      '',
    bio: '',
    imageUrl: speaker6,
    category: '',
  },
  {
    id: '8',
    name: 'Heba Ibrawish',
    title: '',
    speechTitle: '',
    bio: '',
    imageUrl: speaker7,
    category: '',
  },
  {
    id: '9',
    name: 'Diana Kfouf',
    title: '',
    speechTitle: '',
    bio: '',
    imageUrl: speaker8,
    category: '',
  },
  {
    id: '10',
    name: 'Qusai Melhem',
    title: '',
    speechTitle:
      '',
    bio: "",
    imageUrl: speaker9,
    category: '',
  },
  {
    id: '11',
    name: 'Haitham Baroudi',
    title: '',
    speechTitle:
      '',
    bio: "",
    imageUrl: speaker11,
    category: '',
  },
  {
    id: '12',
    name: 'Sameera Dweik',
    title: '',
    speechTitle:
      '',
    bio: "",
    imageUrl: speaker12,
    category: '',
  },
];

export const ORGANIZER: Organizer = {
  name: 'Saif Al-shul',
  role: 'Licence Holder',
  bio: ``,
  imageUrl: organizerImg2,
};

export const PARTNERS: Partner[] = [
  // Platinum Tier
  {
    name: 'SKYFALL ENTERPRISES',
    logoUrl: partnerGold1,
    tier: 'Platinum',
  },
{
    name: 'Correct',
    logoUrl: partnerGold5,
    tier: 'Platinum',
  },


 //Gold
  {
    name: 'Solvenear',
    logoUrl: partnerGold2,
    tier: 'Gold',
  },
  {
    name: 'Quantum energy pendant',
    logoUrl: partnerGold3,
    tier: 'Gold',
  },
  {
    name: 'Annubala',
    logoUrl: partnerGold4,
    tier: 'Gold',
  },
 
  {
    name: 'Partner 1',
    logoUrl: partnerSilver1,
    tier: 'Gold',
  },
  {
    name: 'Partner 2',
    logoUrl: partnerSilver2,
    tier: 'Gold',
  },
  {
    name: 'شينالكو',
    logoUrl: partnerSilver3,
    tier: 'Gold',
  },

 {
    name: 'شبابيك',
    logoUrl: partnerMedia2,
    tier: 'Gold',
  },
   {
    name: 'Don pioi',
    logoUrl: partnerGold6,
    tier: 'Gold',
  },
    {
    name: 'Mythic',
    logoUrl: partnerGold7,
    tier: 'Gold',
  },
      {
    name: 'Petra',
    logoUrl: partnerGold8,
    tier: 'Gold',
  },
        {
    name: 'الرأي',
    logoUrl: partnerGold9,
    tier: 'Gold',
  },
         {
    name: 'injaz news',
    logoUrl: partnerGold10,
    tier: 'Gold',
  },
       {
    name: 'kayan',
    logoUrl: partnerGold11,
    tier: 'Gold',
  },
       {
    name: 'Random',
    logoUrl: partnerGold12,
    tier: 'Gold',
  },
         {
    name: 'TAG',
    logoUrl: partnerGold13,
    tier: 'Gold',
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'Saif Al-shul',
    role: 'licence holder ',
    imageUrl: organizerImg,
    linkedin: '',
  },
  {
    id: '2',
    name: "Saleh Alrawabdeh",
    role: 'Co-Organizer',
    imageUrl: team1,
    linkedin: '',
  },
  {
    id: '3',
    name: 'Shahed Osama',
    role: 'PR Team Leader',
    imageUrl: team2,
    linkedin: '',
  },
  {
    id: '4',
    name: 'Hana Aldayyat',
    role: 'Media Relations Manager',
    imageUrl: team3,
    linkedin: '',
  },
  {
    id: '5',
    name: 'Zaid Ghassan',
    role: 'PR Team Member',
    imageUrl: team4,
    linkedin: '',
  },
  {
    id: '6',
    name: 'Sofia Alsunna',
    role: 'PR Team Member',
    imageUrl: team5,
    linkedin: '',
  },
  {
    id: '7',
    name: 'Abdullah Aldahabi',
    role: 'Marketing Leader',
    imageUrl: team6,
    linkedin: '',
    
  },
  {
    id: '8',
    name: 'Tasneem Theeb',
    role: 'Mrketing Team Member',
    imageUrl: team7,
    linkedin: '',
  },
  {
    id: '9',
    name: 'Farah Alazizi',
    role: 'Marketing Team Member',
    imageUrl: team8,
    linkedin: '',
  },
  {
    id: '10',
    name: "Nermeen Darras",
    role: 'Marketing Team Member',
    imageUrl: team9,
    linkedin: '',
  },
  {
    id: '11',
    name: 'Lama Alaqli',
    role: 'Marketing Team Member',
    imageUrl: team10,
    linkedin: '',
  },
  {
    id: '12',
    name: 'Zahra Migdadi',
    role: 'Speaker Curation Leader',
    imageUrl: team11,
    linkedin: '',
  },
  {
    id: '13',
    name: 'Aryam Alzaben',
    role: 'Speaker Curation Team Member',
    imageUrl: team12,
    linkedin: '',
  },

];

export const SCHEDULE: ScheduleItem[] = [
  {
    time: '8:45–9:45 AM',
    title: 'Registration and guest reception',
    description:''
  },
  {
    time: '9:45–10:00 AM',
    title: 'Event Opening',
    description: '',
  },
  {
    time: '10:00–10:18 AM',
    title: 'Speaker 1',
    description: 'Farah Oweis',
  },
  {
    time: '10:18–10:36 AM',
    title: 'Speaker 2',
    description: 'Mohammad Nabhan',
    speakerId: '',
  },
  {
    time: '10:36–10:54 AM',
    title: 'Speaker 3',
    description: 'Haneen Al Tamimi',
  },
  {
    time: '10:54–11:12 AM',
    title: 'Speaker 4',
    description: 'Hamza Al Khlaifat',
  },
  {
    time: '11:12–11:32 AM',
    title: 'Activity 1',
    description: 'Dania Kfouf'
  },
  {
    time: '11:32-11:47 AM',
    title: 'Session 1 Awards',
    description: ''
  },
  {
    time: '11:47 AM -12:07 PM',
    title: 'Break',
    description: '',
  },
  {
    time: '12:07-12:25 PM',
    title: 'Speaker 5',
    description: 'Heba Ibrawish',
  },
  {
    time: '12:25-12:43 PM',
    title: 'Speaker 6',
    description: 'Hamza Abu Khdair',
  },
  {
    time: '12:43-1:01 PM',
    title: 'Speaker 7',
    description: 'Wesam Alkresheh',
  },
  {
    time: '1:01-1:19 PM',
    title: 'Speaker 8',
    description: 'Selena Rabab’ah',
  },
  {
    time: '1:19-1:34 PM',
    title: 'Session 2 Awards',
    description:''
  },
  {
    time: '1:34-1:54 PM',
    title: 'Break',
    description: '',
  },
   {
    time: '1:54-2:14 PM',
    title: 'Activity 2',
    description: 'Qusai Mlhem',
  },
   {
    time: '2:14-3:04 PM',
    title: 'Closing & Awards Ceremony',
    description: '',
  },
   {
    time: '3:04-4:00 PM',
    title: 'Lunch',
    description: '',
  },

];
