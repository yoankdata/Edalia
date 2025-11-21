import { PlaceHolderImages } from './placeholder-images';

export interface Teacher {
  id: string;
  name: string;
  avatarImageId: string;
  subjects: string[];
  rate: number;
  rating: number;
  reviews: number;
  location: string;
  bio: string;
  experience: string;
  qualifications: string[];
  whatsappNumber: string;
}

export const teachers: Teacher[] = [
  {
    id: '1',
    name: 'Amina Okoro',
    avatarImageId: 'teacher-1',
    subjects: ['Mathematics', 'Physics'],
    rate: 25,
    rating: 4.9,
    reviews: 42,
    location: 'Cape Town, SA',
    bio: 'Passionate about making math intuitive and fun. I use real-world examples to help students grasp complex concepts and build a strong foundation for their future studies.',
    experience: '8 years of teaching experience in both public and private schools.',
    qualifications: ['B.Sc. in Mathematics', 'Postgraduate Certificate in Education'],
    whatsappNumber: '27821234567',
  },
  {
    id: '2',
    name: 'Bolu Adebayo',
    avatarImageId: 'teacher-2',
    subjects: ['English', 'History'],
    rate: 22,
    rating: 4.8,
    reviews: 35,
    location: 'Lagos, NG',
    bio: 'I believe storytelling is the best way to learn. I help students find their voice in writing and develop a deep appreciation for the events that shaped our world.',
    experience: '6 years of tutoring experience for various age groups.',
    qualifications: ['B.A. in English and History', 'Certified TEFL Instructor'],
    whatsappNumber: '2348012345678',
  },
  {
    id: '3',
    name: 'Chinedu Eze',
    avatarImageId: 'teacher-3',
    subjects: ['Chemistry', 'Biology'],
    rate: 28,
    rating: 4.9,
    reviews: 51,
    location: 'Johannesburg, SA',
    bio: 'The world of science is fascinating, and I bring that excitement to every lesson. My goal is to foster curiosity and critical thinking skills through hands-on examples and experiments.',
    experience: '10 years as a high school science teacher and department head.',
    qualifications: ['M.Sc. in Organic Chemistry', 'B.Ed.'],
    whatsappNumber: '27831234567',
  },
  {
    id: '4',
    name: 'Fatima Aliyu',
    avatarImageId: 'teacher-4',
    subjects: ['Computer Science', 'Coding'],
    rate: 35,
    rating: 5.0,
    reviews: 60,
    location: 'Nairobi, KE',
    bio: 'From Python basics to web development, I empower students with the digital skills of the future. I make coding accessible and exciting for learners of all levels.',
    experience: '5 years as a software developer and 3 years as a coding bootcamp instructor.',
    qualifications: ['B.Eng. in Computer Science', 'Google Certified Educator'],
    whatsappNumber: '254712345678',
  },
  {
    id: '5',
    name: 'Kwame Mensah',
    avatarImageId: 'teacher-5',
    subjects: ['Music', 'Piano', 'Guitar'],
    rate: 30,
    rating: 4.8,
    reviews: 29,
    location: 'Accra, GH',
    bio: 'Music is a universal language. I offer personalized lessons for piano and guitar, focusing on both theory and practical skills to help students express themselves creatively.',
    experience: '15 years as a professional musician and music tutor.',
    qualifications: ['Diploma in Music Performance', 'ABRSM Grade 8 Piano'],
    whatsappNumber: '233241234567',
  },
  {
    id: '6',
    name: 'Zola Nkosi',
    avatarImageId: 'teacher-6',
    subjects: ['Art', 'Design'],
    rate: 24,
    rating: 4.9,
    reviews: 38,
    location: 'Durban, SA',
    bio: 'I help students unlock their creativity and develop their artistic talents. We explore various mediums, from drawing and painting to digital art, in a supportive and inspiring environment.',
    experience: '7 years teaching art at a creative academy.',
    qualifications: ['B.A. in Fine Arts', 'Certificate in Graphic Design'],
    whatsappNumber: '27841234567',
  },
];

export const findImage = (id: string) => {
  return PlaceHolderImages.find((img) => img.id === id);
};
