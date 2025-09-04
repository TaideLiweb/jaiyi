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
  const formNextBtn = document.querySelector(".form-next-btn")
  const formPrevBtn = document.querySelector(".form-prev-btn")

  // 限制尺寸輸入框只能輸入數字
  const dimensionInputs = document.querySelectorAll("#q1-4, #q1-5, #q1-6")
  dimensionInputs.forEach((input) => {
    input.addEventListener("input", (event) => {
      // 將輸入值中的非數字字符替換為空字符串
      event.target.value = event.target.value.replace(/\D/g, "")
    })
  })

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

  // 擷取 #capture 區塊內的表單資料
  function getCaptureData() {
    const captureEl = document.querySelector("#capture")
    if (!captureEl) return null

    const data = {}

    // 問題 1: 包含 checkbox 和尺寸輸入
    const q1Selections = []
    captureEl
      .querySelectorAll('#q1 input[type="checkbox"]:checked')
      .forEach((cb) => {
        const label = captureEl.querySelector(`label[for="${cb.id}"]`)
        if (label) q1Selections.push(label.textContent.trim())
      })
    data.q1 = {
      selections: q1Selections,
      dimensions: {
        width: captureEl.querySelector("#q1-4").value || "",
        depth: captureEl.querySelector("#q1-5").value || "",
        height: captureEl.querySelector("#q1-6").value || "",
      },
    }

    // 問題 2, 3, 4: 只有 checkbox
    for (let i = 2; i <= 4; i++) {
      const selections = []
      captureEl
        .querySelectorAll(`#q${i} input[type="checkbox"]:checked`)
        .forEach((cb) => {
          const label = captureEl.querySelector(`label[for="${cb.id}"]`)
          if (label) selections.push(label.textContent.trim())
        })
      data[`q${i}`] = selections
    }

    return data
  }
  // Quiz logic
  const questions = [
    document.getElementById("q1"),
    document.getElementById("q2"),
    document.getElementById("q3"),
    document.getElementById("q4"),
  ]
  const totalQuestions = questions.length
  let currentQuestionIndex = 0 // 0-based index

  function updateFormView() {
    // 隱藏所有問題，並顯示當前的問題
    questions.forEach((q, index) => {
      if (index === currentQuestionIndex) {
        q.classList.remove("hidden")
      } else {
        q.classList.add("hidden")
      }
    })

    // 更新按鈕的可見性和文字
    formPrevBtn.classList.toggle("hidden", currentQuestionIndex === 0)

    if (currentQuestionIndex === totalQuestions - 1) {
      formNextBtn.textContent = "下載"
    } else {
      formNextBtn.textContent = "下一題"
    }
  }

  formNextBtn.addEventListener("click", async () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      currentQuestionIndex++
      updateFormView()
    } else {
      // 這是「下載」按鈕的操作
      formNextBtn.disabled = true
      formNextBtn.textContent = "下載中..."

      // 暫時顯示所有問題以供截圖
      questions.forEach((q) => q.classList.remove("hidden"))
      const navButtonsContainer = capture.querySelector(
        '[data-capture="exclude"]',
      )
      if (navButtonsContainer) navButtonsContainer.style.display = "none"

      // 擷取表單資料並在 console 中顯示
      const formData = getCaptureData()
      // console.log("擷取到的問卷資料:", formData)

      try {
        const result = await snapdom(capture, { scale: 2 })
        await result.download({ format: "png", filename: "使用空閒與考量" })
      } catch (error) {
        console.error("Oops, something went wrong!", error)
        alert("圖片截圖失敗，請稍後再試。")
      } finally {
        // 還原畫面
        if (navButtonsContainer) navButtonsContainer.style.display = ""
        updateFormView()
        formNextBtn.disabled = false
        formNextBtn.textContent = "下載"
      }
    }
  })

  formPrevBtn.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--
      updateFormView()
    }
  })

  // 初始化表單畫面
  updateFormView()

  const resizeHandle = () => {
    ScrollTrigger.update()
  }

  resizeHandle()
  window.addEventListener("resize", resizeHandle)
})
