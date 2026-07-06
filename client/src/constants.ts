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

export const SCHEDULE_TEDX: ScheduleItem[] = [
  {
    time: '8:00–10:00 AM',
    title: 'Registration and guest arrival',
    description:''
  },
  {
    time: '10:00–10:30 AM',
    title: 'Opening ceremony',
    description: '',
  },
  {
    time: '10:30–10:45 AM',
    title: 'Talk 1',
    description: '',
  },
  {
    time: '10:50–11:05 AM',
    title: 'Talk 2',
    description: '',
    speakerId: '',
  },
  {
    time: '11:10–11:25 AM',
    title: 'Talk 3',
    description: '',
  },
  {
    time: '11:25–11:35 AM',
    title: 'Speaker appreciation',
    description: 'Group 1',
  },
  {
    time: '11:35–12:35AM',
    title: 'Coffee Break & Networking',
    description: '',
  },
  {
    time: '12:35-12:50 AM',
    title: 'Talk 4',
    description: ''
  },
  {
    time: '12:55 AM -01:10 PM',
    title: 'Talk 5',
    description: '',
  },
  {
    time: '1:15-01:30 PM',
    title: 'Talk 6',
    description: '',
  },
  {
    time: '01:30-01:40PM',
    title: 'Speaker appreciation',
    description: 'Group 2',
  },
  {
    time: '01:40-02:40 PM',
    title: 'Lunch Break & Experience Zone',
    description: '',
  },
  {
    time: '2:45-03:15 PM',
    title: 'Music Performance',
    description: '',
  },
  {
    time: '03:15-03:45 PM',
    title: 'Talk 7',
    description:''
  },
  {
    time: '03:50-04:05PM',
    title: 'Talk 8',
    description: '',
  },
   {
    time: '04:10-04:20PM',
    title: 'Q&A Session',
    description: 'Qusai Mlhem',
  },
   {
    time: '04:25-04:40PM',
    title: 'Talk 9',
    description: '',
  },
   {
    time: '04:40-04:50PM',
    title: 'Speaker appreciation',
    description: 'Group 3',
  },

    {
    time: '04:50-05:10PM',
    title: 'Closing Ceremony',
    description: 'Includes Sponsor Appreciation ',
  }, 
  {
    time: '05:10-05:40PM',
    title: 'Networking & Photo Session',
    description: '',
  },

];
export const SCHEDULE_PRE_TEDX = [ 
  {
    time: '10:30 AM –12:00 PM',
    title: 'Registration and Check-in',
    description:'Guest arrival,badge collection,welcome music & light networking',
  },
  {
    time: '12:00–12:30 PM',
    title: 'Introduction of the day',
    description: 'Welcome speech, agenda overview, Tedx guidelines & setting the tone ',
  },
  {
    time: '12:30–01:30 PM',
    title: 'Session 1',
    description: '',
  },
  {
    time: '01:30–02:00 PM',
    title: 'Break',
    description: 'Networking & refreshments',
    speakerId: '',
  },
  {
    time: '02:15–03:15 PM',
    title: 'Session 2',
    description: '',
  },
  {
    time: '03:15-4:15 PM',
    title: 'Break',
    description: 'Lunch,Experience Zone & Networking activities',
  },
  {
    time: '4:30-5:50 PM',
    title: 'Final Session',
    description: ''
  },
  
 ]; 
