import { Banner } from "./_components/Banner";
import { Faq } from "./_components/Faq";
import { FeedBackUser } from "./_components/FeedbackUser";
import { Footer } from "./_components/Footer";
import { Header } from "./_components/Header";
import { Main } from "./_components/Main";
import { TutorialUso } from "./_components/TutorialUso";

export default function Home() {
  return (
    <>
      <Header />
      <Main />
      <Banner />
      <TutorialUso />
      <FeedBackUser />
      <Faq />
      <Footer />
    </>
  );
}
