import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';

const generateSlug = (name) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

const PARAGRAPHS = [
  `We are a collective of varying interest and background, but shared intent to develop a new kind of artistic community; one that is focused on pushing artistic forms and expressions of technology. Founded in 2023 by Thai artists and technologists who converged in New York City, we started out as a platform for emerging new media artists working in Bangkok. We've since grown into something harder to categorize and more interesting for it.`,
  `The name is intentional. A cache is a collection of things stored in a hidden place. We like that. We are not interested in the politics of the art world, the rules of the commercial world, or the hype cycles of the tech industry. We are interested in finding the people who are using technology to say something that none of those worlds quite have room for. That's more or less what we're doing. We collect the people who believe code can be soft and strange, that technology can express something painful, moving, or genuinely weird and that artists fluent in its language have something distinct to bring to conversations that have historically excluded them.`,
  `Our particular artistic point of view is neither generic nor vague; we bias works and perspectives that demonstrate the fringes of how technology is applied: work that explores the playful, the non-anthropocentric, the emotional, the absurd, crossing and surprising normative expectations of how technology is used.`,
];

const EVENTS = [
      {
        name: 'Bangkok Art Book Fair',
        desc: 'Presented our curation of tech zines and prints at BACC',
        year: '2025',
        images: [
          '/bkkabf/IMG_1648.JPG',
          '/bkkabf/1.png',
          '/bkkabf/2.png',
          '/bkkabf/IMG_1804.JPG',
          '/bkkabf/4.png',
          '/bkkabf/IMG_1661.JPG',
          '/bkkabf/IMG_1694.JPG',
          '/bkkabf/IMG_1725.JPG',
          '/bkkabf/IMG_1856.JPG',
          '/bkkabf/IMG_1915.JPG',
          '/bkkabf/IMG_2046.JPG',
        ],
      },
      {
        name: 'Close Inspection From Afar',
        desc: 'Pop-up group exhibition at ETA Bangkok',
        year: '2025',
        images: [
          '/closeInspectionFromAfar/1.png',
          '/closeInspectionFromAfar/2.png',
          '/closeInspectionFromAfar/3.png',
          '/closeInspectionFromAfar/4.png',
          '/closeInspectionFromAfar/5.png',
          '/closeInspectionFromAfar/6.png',
          '/closeInspectionFromAfar/7.png',
          '/closeInspectionFromAfar/8.png',
          '/closeInspectionFromAfar/9.png',
          '/closeInspectionFromAfar/10.png',
        ],
      },
      {
        name: 'Data Farmers Market',
        desc: 'Buy and sell raw data at the Goethe Institut',
        year: '2025',
        images: [
          '/dataFarmersMarket/1.png',
          '/dataFarmersMarket/2.png',
          '/dataFarmersMarket/3.png',
        ],
      },
      {
        name: 'A Bit of Thai Tunes',
        desc: 'Mini Outdoor Digital Arts and Live Coding Music Festival with a Twist of Thainess at Museum Siam',
        year: '2024',
        images: [
          '/aBitOfThaiTunes/1.png',
          '/aBitOfThaiTunes/2.png',
          '/aBitOfThaiTunes/3.png',
          '/aBitOfThaiTunes/4.png',
          '/aBitOfThaiTunes/5.png',
          '/aBitOfThaiTunes/6.png',
          '/aBitOfThaiTunes/7.png',
          '/aBitOfThaiTunes/8.png',
          '/aBitOfThaiTunes/9.png',
          '/aBitOfThaiTunes/10.png',
        ],
      },
      {
        name: 'Shift by Cache',
        desc: '11-day independent show at 1559 Space featuring Artist Talk and Open Mic Night',
        year: '2024',
        images: [
          '/shiftByCache/2024-04-07_1559_Shift_Cache Collective-88.jpg',
          '/shiftByCache/772A1189.jpg',
          '/shiftByCache/772A1157.jpg',
          '/shiftByCache/772A1165.jpg',
          '/shiftByCache/772A3357.jpg',
          '/shiftByCache/772A3112.jpg',
          '/shiftByCache/772A3436.jpg',
          '/shiftByCache/772A3574.jpg',
          '/shiftByCache/02.png',
          '/shiftByCache/03.png',
          '/shiftByCache/2024-04-07_1559_Shift_Cache Collective-35.jpg',
          '/shiftByCache/2024-04-07_1559_Shift_Cache Collective-41.jpg',
          '/shiftByCache/2024-04-07_1559_Shift_Cache Collective-48.jpg',
          '/shiftByCache/2024-04-07_1559_Shift_Cache Collective-54.jpg',
          '/shiftByCache/2024-04-07_1559_Shift_Cache Collective-79.jpg',
          '/shiftByCache/772A3672.jpg',
          '/shiftByCache/772A3817.jpg',
          '/shiftByCache/772A3890.jpg',
          '/shiftByCache/772A4302.jpg',
          '/shiftByCache/772A4369.jpg',
          '/shiftByCache/IMG_3341.jpg',
          '/shiftByCache/cache_1.png',
          '/shiftByCache/cache_7.png',
          '/shiftByCache/image 1.png',
          '/shiftByCache/image 2.png',
          '/shiftByCache/night.jpg',
        ],
      },
];

const EVENT_SLUGS = EVENTS.map(event => generateSlug(event.name));
const SLUG_TO_INDEX = new Map(EVENT_SLUGS.map((slug, index) => [slug, index]));

const SCROLL_SPEED = 0.4;

const NewHome = () => {
  const logoRef = useRef(null);
  const rotationRef = useRef(0);
  const prevScrollRef = useRef(0);
  const lockedRef = useRef(false);
  const carouselRefs = useRef([]);

  const [hideCarousel, setHideCarousel] = useState(null);
  const [focusProject, setFocusProject] = useState(null);
  const [carouselProgress, setCarouselProgress] = useState(0);

  useEffect(() => {
    prevScrollRef.current = window.scrollY;

    const onScroll = () => {
      const delta = window.scrollY - prevScrollRef.current;
      rotationRef.current += delta * SCROLL_SPEED;
      prevScrollRef.current = window.scrollY;
      if (logoRef.current) {
        logoRef.current.style.transform = `rotate(${rotationRef.current}deg)`;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);


  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash.replace('#', '');
      const eventIndex = SLUG_TO_INDEX.get(hash);

      if (eventIndex !== undefined) {
        const timeoutId = setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            const offset = 270;
            const elementTop = element.getBoundingClientRect().top + window.scrollY;
            const scrollPosition = elementTop - offset;

            window.scrollTo({
              top: Math.max(0, scrollPosition),
              behavior: 'smooth'
            });

            // Focus the event (expand carousel)
            setFocusProject(eventIndex);
            if (carouselRefs.current[eventIndex]) {
              carouselRefs.current[eventIndex].scrollLeft = 0;
            }
            setCarouselProgress(0);
          }
        }, 100);

        return () => clearTimeout(timeoutId);
      }
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      if (window.location.hash) {
        const hash = window.location.hash.replace('#', '');
        const eventIndex = SLUG_TO_INDEX.get(hash);
        const element = document.getElementById(hash);

        if (element) {
          const offset = 270;
          const elementTop = element.getBoundingClientRect().top + window.scrollY;
          const scrollPosition = elementTop - offset;

          window.scrollTo({
            top: Math.max(0, scrollPosition),
            behavior: 'smooth'
          });

          // Focus the event (expand carousel)
          if (eventIndex !== undefined) {
            setFocusProject(eventIndex);
            if (carouselRefs.current[eventIndex]) {
              carouselRefs.current[eventIndex].scrollLeft = 0;
            }
            setCarouselProgress(0);
          }
        }
      } else {
        // No hash - unfocus and scroll to top
        setFocusProject(null);
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleFocusClick = (focusIndex) => {
    const slug = EVENT_SLUGS[focusIndex];
    window.history.pushState(null, '', `#${slug}`);

    if (focusProject == focusIndex) {
      setFocusProject(null);
    } else {
      setFocusProject(focusIndex);
      if (carouselRefs.current[focusIndex]) {
        carouselRefs.current[focusIndex].scrollLeft = 0;
      }
      setCarouselProgress(0);
    }
  }

  const handleMouseOver = (focusIndex) => {
    if (focusProject == null) {
      setHideCarousel(focusIndex)
    } else if (focusProject !== null) {
      if (focusProject !== focusIndex) {
        setHideCarousel(focusIndex);
      }
    }
  }

  const handleMouseOut = (focusIndex) => {
    if (focusProject !== focusIndex) {
      setHideCarousel(null);
    } 
  }

  const handleCarouselScroll = (e, itemIndex) => {
    if (focusProject === itemIndex) {
      const { scrollLeft, scrollWidth, clientWidth} = e.currentTarget;
      setCarouselProgress(scrollLeft / (scrollWidth - clientWidth));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.gradientOverlay} />
      <section className={styles.hero}>
        <div ref={logoRef} className={styles.spinLogo}>
          <svg width="79" height="55" viewBox="0 -5 85 55" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.1496 2.99073C14.8979 3.28524 16.5675 2.49297 18.1542 1.25272C20.7311 -0.767356 23.105 -0.319372 24.9569 2.42246C25.2759 2.89118 25.5825 3.3682 25.9015 3.83693C27.0408 5.51687 28.2547 5.74501 29.9036 4.55038C30.5457 4.08581 31.0843 3.45116 31.7679 3.09028C32.5385 2.67963 33.4044 2.36024 34.2661 2.2358C35.2231 2.09891 36.1221 2.56764 36.4743 3.47605C36.843 4.43839 36.6193 5.42561 35.8156 6.17225C35.5421 6.42528 35.2314 6.66586 34.8917 6.81934C33.8684 7.28806 30.6286 8.29603 29.7006 9.95523C29.2034 10.8429 28.4784 11.7057 27.6498 12.274C26.7881 12.863 25.6488 12.7344 24.6504 12.2657C23.569 11.7596 23.3039 10.5691 23.6685 9.6068C24.1946 8.22551 23.656 7.39591 22.467 7.1014C21.0874 6.76127 19.7078 6.40454 18.3572 5.969C16.2236 5.28043 13.6716 6.45431 12.4577 8.81868C11.9813 9.75198 11.6415 10.7599 11.2604 11.743C10.7508 13.0579 9.96366 14.0866 8.62964 14.6922C7.67262 15.1236 6.71975 15.609 5.87044 16.2187C4.69799 17.0608 4.41628 18.4337 5.06672 19.7321C5.41886 20.4372 5.85387 21.1051 6.31374 21.748C7.11332 22.868 7.31218 24.0875 7.03875 25.3982C6.86889 26.2112 6.60374 27.0035 6.45874 27.8165C6.12316 29.6873 6.99318 31.1764 8.85336 31.5207C11.3557 31.9894 13.5307 33.0223 15.6022 34.4741C17.9802 36.1416 20.7353 35.0755 21.9077 32.3295C22.4132 31.1432 23.0595 29.9237 23.9378 29.0028C25.3919 27.4764 27.2645 27.4432 28.4536 28.6295C29.713 29.8864 29.8994 32.6448 28.4826 33.7731C26.6348 35.2414 25.2966 36.9753 24.1822 39.0161C23.4075 40.4347 22.0527 40.8661 20.3293 40.1444C17.6861 39.0369 14.9932 39.0161 12.2257 39.1157C9.13507 39.2235 6.8316 37.975 5.28629 35.1668C4.4287 33.6113 3.19825 32.2341 2.00923 30.886C0.559206 29.2351 -0.0125181 27.4764 0.426633 25.2696C0.658637 24.0958 0.642065 22.7601 0.327202 21.607C-0.497241 18.5831 0.223629 16.0984 2.48981 14.0327C4.45356 12.2449 5.65915 10.0631 6.30959 7.50376C7.25833 3.75397 8.2982 2.99488 12.1594 2.99073C12.3873 2.99073 12.6151 2.99073 13.1496 2.99073Z" fill="#231F20"/>
            <path d="M48.5013 2.9907C50.2496 3.28521 51.9192 2.49294 53.5059 1.25269C56.0828 -0.767387 58.4567 -0.319403 60.3086 2.42243C60.6276 2.89115 60.9342 3.36817 61.2532 3.83689C62.3925 5.51684 63.6064 5.74498 65.2553 4.55035C65.8974 4.08578 66.436 3.45113 67.1196 3.09025C67.8902 2.6796 68.756 2.36021 69.6178 2.23577C70.5748 2.09888 71.4738 2.56761 71.826 3.47602C72.1947 4.43836 71.971 5.42558 71.1672 6.17222C70.8938 6.42525 70.5831 6.66583 70.2434 6.81931C69.2201 7.28803 65.9803 8.296 65.0523 9.9552C64.5551 10.8429 63.8301 11.7057 63.0015 12.2739C62.1398 12.8629 61.0005 12.7344 60.002 12.2656C58.9207 11.7596 58.6556 10.5691 59.0202 9.60676C59.5463 8.22548 59.0077 7.39588 57.8187 7.10137C56.4391 6.76124 55.0595 6.40451 53.7089 5.96897C51.5753 5.2804 49.0233 6.45428 47.8094 8.81864C47.333 9.75195 46.9932 10.7599 46.6121 11.743C46.1025 13.0579 45.3153 14.0866 43.9813 14.6922C43.0243 15.1236 42.0714 15.6089 41.2221 16.2187C40.0497 17.0607 39.768 18.4337 40.4184 19.732C40.7705 20.4372 41.2056 21.105 41.6654 21.748C42.465 22.8679 42.6639 24.0874 42.3904 25.3982C42.2206 26.2112 41.9554 27.0035 41.8104 27.8165C41.4748 29.6872 42.3449 31.1764 44.205 31.5207C46.7074 31.9894 48.8824 33.0222 50.9539 34.474C53.3319 36.1415 56.087 35.0755 57.2594 32.3295C57.7649 31.1432 58.4111 29.9237 59.2894 29.0028C60.7436 27.4764 62.6162 27.4432 63.8052 28.6295C65.0647 29.8863 65.2511 32.6448 63.8342 33.773C61.9865 35.2414 60.6483 36.9753 59.5339 39.0161C58.7592 40.4347 57.4044 40.8661 55.681 40.1444C53.0378 39.0368 50.3449 39.0161 47.5774 39.1156C44.4868 39.2235 42.1833 37.9749 40.638 35.1667C39.7804 33.6112 38.5499 32.2341 37.3609 30.886C35.915 29.2393 35.3433 27.4805 35.7783 25.2738C36.0103 24.0999 35.9937 22.7642 35.6789 21.6111C34.8544 18.5872 35.5753 16.1025 37.8415 14.0368C39.8052 12.249 41.0108 10.0672 41.6613 7.50788C42.61 3.75808 43.6499 2.999 47.5111 2.99485C47.739 2.99485 47.9668 2.99485 48.5013 2.99485V2.9907Z" fill="#231F20"/>
            <path d="M34.0383 43.9979C37.796 43.749 39.9751 43.9937 40.0456 46.6567C40.058 47.6606 39.6396 48.1168 38.347 48.4819C35.2273 49.158 32.7209 49.6184 29.5515 49.9834C28.4122 50.1162 27.0285 49.6309 26.0466 49.1953C25.3009 48.793 24.5842 47.7601 24.4557 46.9139C24.232 45.4082 25.5246 44.7943 26.7633 44.6284C28.9674 44.3339 31.1963 44.2343 34.0342 44.002L34.0383 43.9979Z" fill="#231F20"/>
            <path d="M18.6308 18.554C21.1911 18.7199 22.7779 20.0224 22.8897 21.6775C22.9187 22.113 22.7282 22.6896 22.4299 23.0048C21.2699 24.2409 19.2564 24.3114 17.7069 22.9758C17.0482 22.4075 16.4931 21.4949 16.5386 20.516C16.6795 19.8731 17.0606 18.5499 18.6308 18.5499V18.554Z" fill="#231F20"/>
            <path d="M54.3387 23.4238C53.1829 23.4238 52.2631 23.1915 51.6044 22.8845C50.8587 22.4199 50.7675 22.1586 50.6267 21.5696C50.5231 20.3999 50.9042 19.7818 51.7991 19.226C53.0296 18.6867 54.086 18.8776 55.3993 19.2758C56.3729 19.6076 56.7872 20.1676 56.5552 21.5862C56.1409 23.0339 55.3786 23.4196 54.3387 23.4196V23.4238Z" fill="#231F20"/>
          </svg>
        </div>
        <div className={styles.wordmark}>
          <img src="/cache.svg" alt="Cache" />
        </div>
      </section>

      <section className={styles.body}>
        {PARAGRAPHS.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </section>

      <section className={styles.indexSection}>
        <p className={styles.indexLabel}>Index</p>
          <div className={styles.indexGroup}>
            <div className={styles.events}>
              {EVENTS.map(({ name, desc, images, year }, itemIndex) => (
                <div
                  key={name}
                  id={EVENT_SLUGS[itemIndex]}
                  className={styles.event}
                >
                  <span className={styles.year}>{year}</span>
                  <p
                    className={styles.eventName}
                    onMouseEnter={() => handleMouseOver(itemIndex)}
                    onMouseLeave={() => handleMouseOut(itemIndex)}
                    onClick={() => handleFocusClick(itemIndex)}
                  >
                    {name}
                  </p>
                  <p className={styles.eventDesc}>{desc}</p>
                  <div
                    ref={(el) => (carouselRefs.current[itemIndex] = el)}
                    onScroll={(e) => handleCarouselScroll(e, itemIndex)}
                    className={classNames(
                      styles.carousel,
                      {[styles.hide] : hideCarousel !== itemIndex && focusProject !== itemIndex },
                      {[styles.focus] : focusProject == itemIndex }
                    )}
                  >
                    { images.map((imgSrc, index) => {
                      return (
                        <div key={index} className={styles.carouselItem}>
                          <img src={imgSrc} />
                        </div>
                      )
                    })}
                  </div>
                  {
                    focusProject == itemIndex && 
                    <div className={styles.progressBarContainer}>
                      <div className={styles.progressBar} style={{ width: `${carouselProgress * 100}%` }}/>
                    </div>
                  }
                </div>
              ))}
            </div>
          </div>
      </section>

      <section className={styles.contactSection}>
        <p className={styles.contactLabel}>Contact Us</p>
        <a
          href="https://www.instagram.com/thisis.cache/"
          target="_blank"
          rel="noreferrer"
          className={styles.contactLink}
        >
          Instagram
        </a>
        <a href="mailto:hello@thisiscache.com" className={styles.contactLink}>
          E-mail
        </a>
        <p className={styles.year2026}>2026</p>
      </section>
    </div>
  );
};

export default NewHome;
