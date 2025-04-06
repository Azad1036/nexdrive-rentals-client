import React from "react";
import Banner from "../components/Banner";
import WhyChooseUs from "../components/WhyChooseUs";
import RecentListings from "../components/RecentListings";
import SpecialOffers from "../components/SpecialOffers";
import CustomerTestimonials from "../components/CustomerTestimonials";

const Home = () => {
  return (
    <div>
      <Banner />
      <WhyChooseUs />
      <RecentListings />
      <CustomerTestimonials />
      <SpecialOffers />
    </div>
  );
};

export default Home;
