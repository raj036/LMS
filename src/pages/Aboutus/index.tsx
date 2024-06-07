import React from "react";
import { Helmet } from "react-helmet";
import { Text, Img, Button, Heading, Slider } from "../../components";
import Header from "../../components/Header";
import AliceCarousel, { EventObject, DotsItem } from "react-alice-carousel";
import { Link } from "react-router-dom";
import Footer from "components/Footer";

export default function AboutusPage() {
  const [sliderState, setSliderState] = React.useState(0);
  const sliderRef = React.useRef<AliceCarousel>(null);

  return (
    <>
      <Helmet>
        <title>About Us</title>
      </Helmet>

      <div className="flex flex-col items-center justify-start w-full pt-6 gap-7 bg-white-A700">
        <div className="flex flex-col items-center justify-start w-full">
          <div className="flex flex-col items-center justify-start w-full mt-7 gap-[115px]">
            <div className="flex flex-col items-center justify-start w-full">
              <div className="h-[455px] w-full relative">
                <Img
                  src="images/img_image_41.png"
                  alt="imagefortyone"
                  className="justify-center h-[500px] w-full left-0 bottom-0 right-0 top-0 m-auto object-cover absolute"
                />
                <Heading
                  size="7xl"
                  as="h1"
                  className="w-max left-[2%] bottom-0 top-[50%] my-auto mx-16 absolute"
                >
                  About Us
                </Heading>
              </div>
              <div className="flex flex-row justify-center w-full mt-16">
                <div className="flex flex-row justify-between items-center px-28 mt-16">
                  <div className="flex flex-col items-start justify-start w-[60%]">
                    {/* <Heading
                      size="xs"
                      as="h2"
                      className="!text-light_blue-900_01"
                    >
                      About us
                    </Heading> */}
                    <Heading as="h3" className="mt-[18px] !text-black-900">
                      Professional And Highly Qualified Tutors
                    </Heading>
                    <Text
                      size="xl"
                      as="p"
                      className="mt-5 !text-black-900 !font-medium"
                    >
                      At ILATE, we are a community of passionate educators and
                      innovators, committed to redefining academic excellence in
                      the 21st century. Situated at the intersection of
                      tradition and innovation, our centre provides an
                      unparalleled learning experience that prepares students
                      for the challenges and opportunities of a rapidly changing
                      world. It’s about the right mix of knowledge and
                      adaptability that allows individuals to succeed in future
                      endeavours.
                    </Text>
                    <div className="flex flex-col text-justify gap-4 w-[90%]">
                      <div className="flex flex-row justify-start items-center mt-[17px] gap-4">
                        <Img
                          src="images/img_vector.svg"
                          alt="vector_one"
                          className="h-[15px] mt-1.5"
                        />
                        <Text size="xl" as="p" className="!text-black-900">
                          Our team consists of subject matter experts with
                          extensive experience in international curricula who
                          are dedicated to nurturing each student's potential.
                        </Text>
                      </div>
                      <div className="flex flex-row justify-start items-center mt-[9px] gap-4">
                        <Img
                          src="images/img_vector.svg"
                          alt="vector_three"
                          className="h-[15px] mt-1.5"
                        />
                        <Text size="xl" as="p" className="!text-black-900">
                          We believe in a tailored approach to education and
                          developing personalized learning plans that adapt to
                          the individual needs and goals of our students.
                        </Text>
                      </div>
                      <div className="flex flex-row justify-start items-center mt-1.5 gap-4">
                        <Img
                          src="images/img_vector.svg"
                          alt="vector_five"
                          className="h-[15px]"
                        />
                        <Text size="xl" as="p" className="!text-black-900">
                          Beyond academics, we emphasize the importance of
                          critical thinking, creativity, and emotional
                          intelligence, preparing students for success both
                          inside and outside the classroom.
                        </Text>
                      </div>
                      <div className="flex flex-row justify-start items-center mt-[9px] gap-4">
                        <Img
                          src="images/img_vector.svg"
                          alt="vector_seven"
                          className="h-[15px]"
                        />
                        <Text size="xl" as="p" className="!text-black-900">
                          Utilising the latest educational technology and
                          methodologies, we offer an engaging and effective
                          learning environment that fosters innovation and
                          curiosity.
                        </Text>
                      </div>
                    </div>
                    <Link to="/getadmission">
                      <Button
                        size="2xl"
                        className="mt-[53px] tracking-[0.20px] font-bold min-w-[198px] text-white-A700 bg-deep_orange-500 rounded-lg focus:ring-2 focus:ring-deep_orange-500 transition border border-deep_orange-500 hover:bg-white-A700 hover:text-deep_orange-500"
                      >
                        Apply Now
                      </Button>
                    </Link>
                  </div>
                  <div className="h-[690px] w-[34%] relative">
                    <Img
                      src="images/img_image_42.png"
                      alt="imagefortytwo"
                      className="h-[447px] w-[84%] right-0 top-0 m-auto object-cover absolute rounded-[20px]"
                    />
                    <div className="flex flex-row justify-start w-3/4 bottom-0 left-0 m-auto absolute">
                      <div className="flex flex-row justify-start w-full pt-7 bg-white-A700 rounded-[20px]">
                        <Img
                          src="images/img_image_43.png"
                          alt="imagefortythree"
                          className="w-[94%] mt-0.5 object-cover rounded-[20px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-start w-full mt-[100px] bg-orange-50">
                <div className="flex flex-row justify-start items-start w-[90%] gap-[42px] mx-auto">
                  <div className="h-[500px] w-2/5 relative">
                    <Img
                      src="images/img_image_44.png"
                      alt="imagefortyfour"
                      className="justify-center h-[501px] w-full left-0 bottom-0 right-0 top-0 m-auto rounded-[20px] object-cover absolute"
                    />
                    <div className="flex flex-col items-start justify-start w-[88%] top-[11%] right-0 left-0 m-auto absolute">
                      <Heading size="2xl" as="h2">
                        World Class
                      </Heading>
                      <Heading
                        size="4xl"
                        as="h6"
                        className="mt-8 !text-gray-50_01"
                      >
                        Clear Study Materials
                      </Heading>
                      <Text
                        size="xl"
                        as="p"
                        className="mt-[17px] !text-gray-50_01"
                      >
                        Practice questions and exams are exercises or
                        assessments designed to test students&#39; understanding
                        and application of course material. They help students
                        identify areas of strength and weakness and provide
                        opportunities for self-assessment and improvement.
                      </Text>
                      <Button
                        size="2xl"
                        className="mt-6 tracking-[0.20px] font-bold min-w-[198px] text-white-A700 bg-deep_orange-500 rounded-lg focus:ring-2 focus:ring-deep_orange-500 transition border border-deep_orange-500 hover:bg-white-A700 hover:text-deep_orange-500"
                      >
                        Know More
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start w-[60%] mt-10 gap-9 px-14">
                    {/* <div className="flex flex-col w-full gap-[60px]">
                      <div className="flex flex-row justify-between w-full">
                        <Img
                          src="images/img_image_45.png"
                          alt="imagefortyfive"
                          className="w-[18%] object-cover"
                        />
                        <Img
                          src="images/img_image_46.png"
                          alt="imagefortysix"
                          className="w-[18%] object-cover"
                        />
                        <Img
                          src="images/img_image_47.png"
                          alt="imagefortyseven"
                          className="w-[18%] object-cover"
                        />
                      </div>
                      <div className="flex flex-row justify-between w-full">
                        <Img
                          src="images/img_image_48.png"
                          alt="imagefortyeight"
                          className="w-[18%] object-cover"
                        />
                        <Img
                          src="images/img_image_49.png"
                          alt="imagefortynine"
                          className="w-[18%] object-cover"
                        />
                        <Img
                          src="images/img_image_50.png"
                          alt="imagefifty_one"
                          className="w-[18%] object-cover"
                        />
                      </div>
                      <div className="flex flex-row justify-between w-full">
                        <Img
                          src="images/img_image_51.png"
                          alt="imagefiftyone"
                          className="w-[18%] mt-2.5 object-cover"
                        />
                        <Img
                          src="images/img_image_52.png"
                          alt="imagefiftytwo"
                          className="w-[20%] object-cover"
                        />
                        <Img
                          src="images/img_image_53.png"
                          alt="imagefiftythree"
                          className="w-[20%] object-cover"
                        />
                      </div>
                    </div> */}
                    <ul className="w-full flex flex-col justify-center items-start gap-14 mt-10">
                      <li className="flex justify-start items-center">
                        <Img
                          src="images/img_vector.svg"
                          alt="vector_three"
                          className="h-[15px] mt-1.5"
                        />
                        <Heading
                          size="4xl"
                          as="h2"
                          className="text-black-900 ml-4"
                        >
                          Hand Written Notes
                        </Heading>
                      </li>
                      <li className="flex justify-start items-center">
                        <Img
                          src="images/img_vector.svg"
                          alt="vector_three"
                          className="h-[15px] mt-1.5"
                        />
                        <Heading
                          size="4xl"
                          as="h2"
                          className="text-black-900 ml-4"
                        >
                          Extensive Worksheets
                        </Heading>
                      </li>
                      <li className="flex justify-start items-center">
                        <Img
                          src="images/img_vector.svg"
                          alt="vector_three"
                          className="h-[15px] mt-1.5"
                        />
                        <Heading
                          size="4xl"
                          as="h2"
                          className="text-black-900 ml-4"
                        >
                          Question Banks
                        </Heading>
                      </li>
                      <li className="flex justify-start items-center">
                        <Img
                          src="images/img_vector.svg"
                          alt="vector_three"
                          className="h-[15px] mt-1.5"
                        />
                        <Heading
                          size="4xl"
                          as="h2"
                          className="text-black-900 ml-4"
                        >
                          Test Series
                        </Heading>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="h-[700px] w-[90%] mt-[100px] relative">
                <div className="flex flex-col items-start justify-start w-full gap-[35px] bottom-0 right-0 left-0 p-[35px] m-auto bg-teal-900 absolute rounded-[20px]">
                  <Heading size="xl" as="h6" className="mt-5 ml-[27px]">
                    Flexible
                  </Heading>
                  <Heading as="h2" className="ml-[27px]">
                    For Slowly Grasp Students
                  </Heading>
                  <div className="flex flex-row justify-start w-[65%] ml-[27px]">
                    <div className="flex flex-col items-start justify-start w-full gap-[60px]">
                      <Text
                        size="xl"
                        as="p"
                        className="!font-medium text-justify"
                      >
                        Provide instruction that caters to the diverse needs of
                        students by offering multiple ways to access and engage
                        with the material. Differentiate instruction based on
                        students&#39; learning styles, interests, abilities, and
                        pace of learning.
                      </Text>
                      <div className="flex flex-row justify-between items-start w-[70%]">
                        {/* <div className="flex flex-row justify-center items-center w-[29%] gap-[60px]"> */}
                        <Heading as="h2" className="w-[100%]">
                          <span className="text-5xl">1500+</span>
                          <br />
                          <span className="text-xl">Students</span>
                        </Heading>
                        <div className="h-[90px] w-px bg-white-A700" />
                        {/* <div className="flex flex-row justify-center items-center w-[63%]"> */}
                        {/* </div> */}
                        <Heading as="h2" className="w-[100%] mx-[50px]">
                          <span className="text-5xl">200+</span>
                          <br />
                          <span className="text-xl">Beneficiaries</span>
                        </Heading>
                        <div className="h-[90px] w-px bg-white-A700" />
                        <Heading as="h2" className="w-[100%] mx-[50px]">
                          <span className="text-5xl">10+</span>
                          <br />
                          <span className="text-xl">Tutors</span>
                        </Heading>
                        {/* </div> */}
                      </div>
                    </div>
                  </div>
                </div>
                <Img
                  src="images/img_image_54.png"
                  alt="imagefiftyfour"
                  className="h-[545px] w-1/4 right-[4%] top-0 m-auto object-cover absolute rounded-[20px]"
                />
              </div>
              <div className="h-[600px] w-full mt-[105px] relative">
                <Slider
                  autoPlay
                  autoPlayInterval={2000}
                  responsive={{
                    "0": { items: 1 },
                    "550": { items: 1 },
                    "1050": { items: 1 },
                  }}
                  renderDotsItem={(props: DotsItem) => {
                    return props?.isActive ? (
                      <div className="w-[5%] mr-5 bg-deep_orange-500 rounded" />
                    ) : (
                      <div className="w-[2%] mr-5 bg-white-A700 rounded" />
                    );
                  }}
                  disableButtonsControls={false}
                  activeIndex={sliderState}
                  onSlideChanged={(e: EventObject) => {
                    setSliderState(e?.item);
                  }}
                  ref={sliderRef}
                  className="justify-center w-full left-0 bottom-0 right-0 top-0 m-auto absolute"
                  items={[...Array(3)].map(() => (
                    <React.Fragment key={Math.random()}>
                      <div className="flex flex-row justify-around items-center p-[85px] mx-auto bg-cyan-900 select-none">
                        <div className="h-[430px] w-[30%] relative">
                          <div className="flex flex-row justify-center items-start w-full h-full left-0 bottom-0 right-0 top-0 m-auto absolute">
                            <div className="h-32 w-32 z-[1] bg-white-A700 rounded-full text-center">
                              <Text
                                size="3xl"
                                as="p"
                                className="top-0 mx-auto !text-black-900 !font-oswald"
                              >
                                ”
                              </Text>
                            </div>
                            <Img
                              src="images/img_image_55.png"
                              alt="imagefiftyfive"
                              className="h-[426px] w-[426px] ml-[-88px] rounded-[50%]"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col items-start justify-start w-[50%]">
                          <Heading size="xl" as="h5" className="">
                            Students Testimonials
                          </Heading>
                          <Heading as="h2" className="mt-[27px]">
                            People Says Courses
                            <br />
                          </Heading>
                          <Text
                            size="xl"
                            as="p"
                            className="mt-[39px] !font-medium text-justify"
                          >
                            I thoroughly enjoyed my experience in the
                            engineering program at XYZ University. The
                            curriculum was rigorous yet engaging, and the
                            professors were knowledgeable and supportive. The
                            hands-on projects and internships provided valuable
                            real-world experience that prepared me for my
                            career.
                          </Text>
                          <Text
                            size="xl"
                            as="p"
                            className="mt-0.5 !font-medium"
                          >
                            Sheraldin Beny
                            <br /> - Manager
                          </Text>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
