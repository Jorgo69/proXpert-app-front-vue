<script setup>
import Header from '../helper/Header.vue';
import AdviceAndTips from './AdviceAndTips.vue';
import CallToAction from './CallToAction.vue';
import HeroSection from './HeroSection.vue';
import HowItWork from './HowItWork.vue';
import PopularCategories from './PopularCategories.vue';
import Testimonial from './Testimonial.vue';
import TopRatedByOurCustomers from './TopRatedByOurCustomers.vue';
import WhyJoinOurCommunity from './WhyJoinOurCommunity.vue';
</script>

<template>
    <Header />
    <HeroSection />
    <HowItWork />
    <PopularCategories />
    <TopRatedByOurCustomers />
    <WhyJoinOurCommunity class="bg-gray-50" />
    <CallToAction />
    <Testimonial />
    <AdviceAndTips />
</template>