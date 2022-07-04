import { NextPage } from 'next';
import Image from 'next/image';
import CatImage from '../public/images/cat.jpg';

const CatPage: NextPage = () => <Image src={CatImage} />;

export default CatPage;
