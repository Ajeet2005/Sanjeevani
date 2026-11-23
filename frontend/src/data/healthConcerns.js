/**
 * MOCK DATA: healthConcerns.js
 * 6 Primary Healthcare Categories with custom squircle illustration cards
 */

import catDiabetes from '../assets/images/health-concerns/cat_diabetes.png';
import catStomach from '../assets/images/health-concerns/cat_stomach_gut.png';
import catRespiratory from '../assets/images/health-concerns/cat_respiratory.png';
import catBone from '../assets/images/health-concerns/cat_bone_joints.png';
import catSkin from '../assets/images/health-concerns/cat_skin_haircare.png';
import catWomen from '../assets/images/health-concerns/cat_womens_wellness.png';

export const HEALTH_CONCERNS = [
  {
    id: 'diabetes',
    label: 'Diabetes',
    image: catDiabetes,
    link: '/medicines?category=diabetes',
  },
  {
    id: 'stomach',
    label: 'Stomach & Gut',
    image: catStomach,
    link: '/medicines?category=digestive',
  },
  {
    id: 'respiratory',
    label: 'Respiratory Care',
    image: catRespiratory,
    link: '/medicines?category=respiratory',
  },
  {
    id: 'ortho',
    label: 'Bone & Joints',
    image: catBone,
    link: '/medicines?category=ortho',
  },
  {
    id: 'skin',
    label: 'Skin & Haircare',
    image: catSkin,
    link: '/medicines?category=skin',
  },
  {
    id: 'women',
    label: "Women's Wellness",
    image: catWomen,
    link: '/medicines?category=women',
  },
];
