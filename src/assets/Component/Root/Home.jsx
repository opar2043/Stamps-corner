import React from 'react'
import Banner from '../Shared/Banner'
import WhyChooseUs from './WhyChooseUs'
import PrivacyPolicy from './PrivacyPolicy'
import HomeProducts from '../Products/HomeProducts'

const Home = () => {
  return (
    <div>
        <Banner 
        img={"https://images.pexels.com/photos/6661088/pexels-photo-6661088.jpeg"}
        head={"New Collection, New Generation"}
        para={"GET KNOW EVERYTHING"}
        para2={"THAT YOU WANT"}
        btn1={"GO TO COLLECTION"}
        btn2={"VISIT WEBSITE"}
        ></Banner>
        <WhyChooseUs></WhyChooseUs>
        <HomeProducts></HomeProducts>
        <PrivacyPolicy></PrivacyPolicy>
    </div>
  )
}

export default Home