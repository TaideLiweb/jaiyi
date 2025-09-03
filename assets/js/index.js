// // 跳出 Line 內部瀏覽器
// ;(function () {
//   const url = new URL(window.location.href)
//   const params = url.searchParams

//   if (!params.has("openExternalBrowser")) {
//     // 加上參數
//     params.set("openExternalBrowser", "1")

//     window.location.replace(`${url.origin}${url.pathname}?${params.toString()}`)
//   }
// })()

window.addEventListener("load", () => {
  const circleCards = document.querySelectorAll(".circle-card")
  const squareCards = document.querySelectorAll(".square-card")
  const bgDecorate = document.querySelectorAll(".bg-decorate")
  const goToTop = document.getElementById("go-to-top")
  const quizPosition = document.querySelector("#quiz-position")
  const capture = document.querySelector("#capture")
  const downloadBtn = document.querySelector(".download-btn")

  const blandSwiperInstance = new Swiper(".bland-swiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    // Responsive breakpoints
    breakpoints: {
      768: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 50,
      },
    },
    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  })
  // 顯示按鈕：當滾動超過 300px
  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      goToTop.classList.add("active")
    } else {
      goToTop.classList.remove("active")
    }
  })

  // 點擊按鈕：平滑捲回頂部
  goToTop.addEventListener("click", () => {
    quizPosition.scrollIntoView({ behavior: "smooth" })
  })

  // GSAP scroll-behavior: smooth 有 bug
  gsap.registerPlugin(ScrollTrigger)
  const mm = gsap.matchMedia()

  mm.add(
    {
      mobile: "(max-width: 768px)",
      desktop: "(min-width: 769px)",
    },
    (ctx) => {
      const { mobile } = ctx.conditions

      circleCards.forEach((el, index) => {
        gsap.to(el, {
          y: "0%",
          opacity: 1,
          duration: 0.5,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: el,
            // 用函式值，斷點切換/refresh 時會重新計算
            start: () => (mobile ? "top 50%" : `top ${50 - index * 5}%`),
            toggleActions: "play none none reverse",
            // markers: true, // 除錯時開，正式環境記得關
            invalidateOnRefresh: true, // 尺寸變更時重新取 start
          },
        })
      })
      squareCards.forEach((el, index) => {
        gsap.to(el, {
          rotationY: 0,
          duration: 1,
          scrollTrigger: {
            trigger: el,
            // 用函式值，斷點切換/refresh 時會重新計算
            start: () => (mobile ? "top 50%" : `top ${40 - index * 5}%`),
            toggleActions: "play none none reverse",
            // markers: true, // 除錯時開，正式環境記得關
            invalidateOnRefresh: true, // 尺寸變更時重新取 start
          },
        })
      })
    },
  )

  const topTitle = document.querySelector(".top-title")
  if (topTitle) {
    gsap.to(topTitle, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
    })
  }

  gsap.to(".dishwasher", {
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.3, // 每個間隔 0.3 秒進場
    ease: "power2.out",
  })

  bgDecorate.forEach((el, index) => {
    gsap.to(el, {
      y: "60%",
      opacity: 1,
      duration: 2,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: el,
        // 用函式值，斷點切換/refresh 時會重新計算
        start: "top 30%",
        scrub: 2,
        // markers: true, // 除錯時開，正式環境記得關
        invalidateOnRefresh: true, // 尺寸變更時重新取 start
      },
    })
  })

  downloadBtn.addEventListener("click", async () => {
    // 直接保存為檔案
    await snapdom.download(capture, {
      format: "png",
      filename: "使用空間與考量",
    })
  })

  const resizeHandle = () => {
    // ScrollTrigger.refresh()
    ScrollTrigger.update()
  }

  resizeHandle()
  window.addEventListener("resize", resizeHandle)
})
