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
  const bgDecorate = document.querySelectorAll(".bg-decorate")
  const goToTop = document.getElementById("go-to-top")
  const quizPosition = document.querySelector("#quiz-position")
  const blandSwiper = document.querySelector(".bland-swiper")
  const capture = document.querySelector("#capture")
  const downloadBtn = document.querySelector(".download-btn")
  let isMobile = window.matchMedia("(max-width: 768px)").matches
  let isTablet = window.matchMedia(
    "(min-width: 769px) and (max-width: 1000px)",
  ).matches

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
    },
  )

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

  //   // 火箭移動動畫
  //   gsap.to(".rocket", {
  //     scrollTrigger: {
  //       trigger: ".rocket",
  //       start: "top-=200 80%",
  //       end: "top-=200 20%",
  //       scrub: 2,
  //       // markers: true,
  //     },
  //     x: "120%",
  //     y: "-100%",
  //     ease: "none",
  //     duration: 3,
  //   })

  //   // section-5 背景動畫放大
  //   gsap.to(".section-5-bg", {
  //     scrollTrigger: {
  //       trigger: ".section-5-bg",
  //       start: "center 80%",
  //       end: "center 20%",
  //       scrub: 2,
  //       // markers: true,
  //     },
  //     scale: 1.3,
  //     ease: "none",
  //     duration: 3,
  //   })
  const characters =
    "嘉儀家品世界品牌洗碗機選購指南一站選對世界品牌，洗碗機購足新主張！"
  const charactersArray = []

  characters.split("").forEach((char, index) => {
    if (document.getElementById(`character-target-${index + 1}`)) {
      const writer = HanziWriter.create(`character-target-${index + 1}`, char, {
        width: 50,
        height: 50,
        padding: 0,
        showOutline: false,
        strokeAnimationSpeed: 2, // 5x normal speed
        delayBetweenStrokes: 1, // millisecond
        strokeColor: `${index > 14 ? "#754C24" : "#0c397c"}`,
      })

      charactersArray.push(writer)
    }
  })

  charactersArray.forEach((writer, index) => {
    writer.hideCharacter()
    writer.animateCharacter()
  })

  downloadBtn.addEventListener("click", async () => {
    // 直接保存為檔案
    await snapdom.download(capture, {
      format: "png",
      filename: "使用空間與考量",
    })
  })

  const resizeHandle = () => {
    ScrollTrigger.refresh()
    isMobile = window.matchMedia("(max-width: 768px)").matches
    isTablet = window.matchMedia(
      "(min-width: 769px) and (max-width: 1000px)",
    ).matches
    if (isMobile) {
      // 手機版特效
      charactersArray.forEach((writer) =>
        writer.updateDimensions({ width: 20, height: 20 }),
      )
    } else if (isTablet) {
      // 平板版特效
      charactersArray.forEach((writer) =>
        writer.updateDimensions({ width: 35, height: 35 }),
      )
    } else {
      // 桌機版特效
      charactersArray.forEach((writer) =>
        writer.updateDimensions({ width: 50, height: 50 }),
      )
    }
  }

  resizeHandle()
  window.addEventListener("resize", resizeHandle)
  //   setTimeout(() => {
  //     charactersArray[0].updateDimensions({ width: 20, height: 20 })
  //   }, 1000)

  //   const delay = (ms) => new Promise((r) => setTimeout(r, ms))
  //   const animateOnce = (writer) =>
  //     new Promise((resolve) => writer.animateCharacter({ onComplete: resolve }))

  //   ;(async () => {
  //     for (let i = 0; i < charactersArray.length; i++) {
  //       console.log(i + 1)
  //       await animateOnce(charactersArray[i]) // 等當前完成
  //       await delay(30) // 再等 0.03 秒
  //     }
  //   })()
})
