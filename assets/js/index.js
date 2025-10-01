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

// 定義一個物件，給 v-scope 使用
window.App = {
  quizTitle: "品牌推薦與問卷下載",
  questionCurrentIndex: 1,

  mieleModel: [],
  bertazzoniModel: [],
  whirlpoolModel: [],
  keModel: [],

  showQuestion: "",

  q1Answers: "",
  q2Answers: "",
  q3Answers: "",
  q4Answers: "",

  q1Options: [
    {
      text: "廚下型（需嵌入櫥櫃，搭配廚房系列門板）",
      value: "builtIn",
    },
    {
      text: "獨立式（獨立擺放）",
      value: "freestanding",
    },
    {
      text: "桌上型（放檯面）",
      value: "countertop",
    },
  ],

  builtIn110vHeights: ["76.5-80.4"],
  builtIn220vHeights: ["80.5-81.9", "82-87"],
  builtInAllHeights: ["76.5-80.4", "80.5-81.9", "82-87"],
  freestanding110vHeights: ["79.5-82.5", "84.5-91", "獨立擺放無限制"],
  freestanding220vHeights: ["84.5-84.9", "85-87", "獨立擺放無限制"],
  freestandingAllHeights: ["79.5-82.5", "84.5-85", "87.1-91", "獨立擺放無限制"],

  q2Options: [],
  q3Options: [],
  q4Options: [],

  dishwashers: {
    builtIn: [
      {
        voltage: "220V",
        heights: ["80.5-81.9", "82-87"],
        budgetNote: "無預算限制",
        priceRange: "6萬以上",
        brand: "Miele",
        model: "G7964C SCVi",
      },
      {
        voltage: "220V",
        heights: ["80.5-81.9", "82-87"],
        budgetNote: "無預算限制",
        priceRange: "6萬以上",
        brand: "Miele",
        model: "G7364C SCVi",
      },
      {
        voltage: "220V",
        heights: ["80.5-81.9", "82-87"],
        budgetNote: "無預算限制",
        priceRange: "6萬以上",
        brand: "Miele",
        model: "G5264C SCVi",
      },
      {
        voltage: "220V",
        heights: ["80.5-81.9", "82-87"],
        budgetNote: "無預算限制",
        priceRange: "6萬以上",
        brand: "Miele",
        model: "G7314C SCi",
      },
      {
        voltage: "220V",
        heights: ["80.5-81.9", "82-87"],
        budgetNote: "無預算限制",
        priceRange: "6萬以上",
        brand: "Miele",
        model: "G7114C SCi",
      },
      {
        voltage: "220V",
        heights: ["80.5-81.9", "82-87"],
        budgetNote: "無預算限制",
        priceRange: "6萬以上",
        brand: "Miele",
        model: "G7104C SCi",
      },
      {
        voltage: "220V",
        heights: ["80.5-81.9", "82-87"],
        budgetNote: "無預算限制",
        priceRange: "6萬以上",
        brand: "Miele",
        model: "G5214C SCi",
      },
      {
        voltage: "220V",
        heights: ["82-87"],
        budgetNote: "",
        priceRange: "4-6萬",
        brand: "BERTAZZONI",
        model: "DW603SIDV-60",
      },
      {
        voltage: "110V",
        heights: ["76.5-80.4"],
        budgetNote: "",
        priceRange: "3-4萬",
        brand: "KE",
        model: "KDW-756Si",
      },
      {
        voltage: "110V",
        heights: ["76.5-80.4"],
        budgetNote: "",
        priceRange: "3-4萬",
        brand: "KE",
        model: "KDW-856i",
      },
    ],
    freestanding: [
      {
        voltage: "220V",
        heights: ["84.5-84.9", "85-87", "84.5-85", "87.1-91"],
        budgetNote: "無預算限制",
        priceRange: "6萬以上",
        brand: "Miele",
        model: "G5214C SC",
      },
      {
        voltage: "220V",
        heights: ["85-87", "84.5-85"],
        budgetNote: "",
        priceRange: "4-6萬",
        brand: "BERTAZZONI",
        model: "DW6083FSBC-60",
      },
      {
        voltage: "220V",
        heights: ["85-87", "84.5-85"],
        budgetNote: "",
        priceRange: "4-6萬",
        brand: "Whirlpool",
        model: "WFO3T123PLXD",
      },
      {
        voltage: "110V",
        heights: ["84.5-91", "84.5-85", "87.1-91"],
        budgetNote: "",
        priceRange: "6萬以上",
        brand: "Miele",
        model: "G7101C SC",
      },
      {
        voltage: "110V",
        heights: ["84.5-91", "84.5-85", "87.1-91"],
        budgetNote: "",
        priceRange: "6萬以上",
        brand: "Miele",
        model: "G5001 SC",
      },
      {
        voltage: "110V",
        heights: ["79.5-82.5"],
        budgetNote: "",
        priceRange: "3-4萬",
        brand: "Whirlpool",
        model: "WDFS3R5PIXTW",
      },
      {
        voltage: "110V",
        heights: ["79.5-82.5"],
        budgetNote: "",
        priceRange: "2-3萬",
        brand: "KE",
        model: "KDW-656FW",
      },
    ],
    countertop: [
      {
        voltage: "110V",
        heights: ["47.5"],
        budgetNote: "",
        function: "獨立烘乾",
        priceRange: "1-2萬",
        brand: "KE",
        model: "KDW-236W",
      },
      {
        voltage: "110V",
        heights: ["47.5"],
        budgetNote: "",
        function: "自動開門烘乾",
        priceRange: "1-2萬",
        brand: "KE",
        model: "KDW-156W",
      },
    ],
  },

  handleOptionClick(question, value) {
    this[question] = value
    this.handleDynamicOption()
  },
  handleDynamicOption() {
    this.q2Options = []
    this.q3Options = []
    this.q4Options = []

    // 根據 q1Answers 動態產生 q2Options
    if (this.q1Answers === "countertop") {
      this.dishwashers[this.q1Answers].forEach((item) => {
        this.q2Options.push(item.function)
      })
    } else {
      this.dishwashers[this.q1Answers].forEach((item) => {
        this.q2Options.push(item.voltage)
      })
    }

    // 根據 q2Answers 動態產生 q3Options
    if (this.q1Answers === "builtIn" && this.q2Answers === "110V") {
      this.q3Options = this.builtIn110vHeights
    }
    if (this.q1Answers === "builtIn" && this.q2Answers === "220V") {
      this.q3Options = this.builtIn220vHeights
    }
    if (this.q1Answers === "builtIn" && this.q2Answers === "皆可") {
      this.q3Options = this.builtInAllHeights
    }
    if (this.q1Answers === "freestanding" && this.q2Answers === "110V") {
      this.q3Options = this.freestanding110vHeights
    }
    if (this.q1Answers === "freestanding" && this.q2Answers === "220V") {
      this.q3Options = this.freestanding220vHeights
    }
    if (this.q1Answers === "freestanding" && this.q2Answers === "皆可") {
      this.q3Options = this.freestandingAllHeights
    }

    // 根據 q2Answers & q3Answers 動態產生 q4Options
    this.dishwashers[this.q1Answers].filter((item) => {
      if (
        (item.voltage === this.q2Answers || this.q2Answers === "皆可") &&
        (item.heights.includes(this.q3Answers) ||
          this.q3Answers === "獨立擺放無限制")
      ) {
        this.q4Options.push(item.priceRange)
      }
    })

    console.log(this.q3Answers)

    // 去除重複選項並排序
    this.q2Options = [...new Set(this.q2Options)]
    this.q2Options = this.q2Options.sort()
    this.q2Options = [...this.q2Options, "皆可"]

    this.q4Options = [...new Set(this.q4Options), "無預算限制"]
    this.q4Options = this.q4Options.sort()
  },
  handleCheckAnswer() {
    const mapping = {
      q2Answers: this.q2Options,
      q3Answers: this.q3Options,
      q4Answers: this.q4Options,
    }

    for (const key in mapping) {
      if (!mapping[key].includes(this[key])) {
        this[key] = ""
      }
    }
  },
  handleNextBtnClick() {
    this.handleCheckAnswer()
    if (this.questionCurrentIndex < 5) {
      this.questionCurrentIndex += 1
    }

    if (this.questionCurrentIndex === 3 && this.q1Answers === "countertop") {
      this.questionCurrentIndex = 5
    }

    if (this.questionCurrentIndex === 5) {
      this.handleResult()
    }
  },
  handlePrevBtnClick() {
    this.handleCheckAnswer()
    if (this.questionCurrentIndex === 5 && this.q1Answers === "countertop") {
      this.questionCurrentIndex = 2
      return
    }
    if (this.questionCurrentIndex > 1) {
      this.questionCurrentIndex -= 1
    }
  },

  handleResult() {
    this.mieleModel = []
    this.bertazzoniModel = []
    this.whirlpoolModel = []
    this.keModel = []

    console.log(this.q1Answers, this.q2Answers, this.q3Answers, this.q4Answers)

    // 處理答案邏輯
    const resultAnswers = this.dishwashers[this.q1Answers].filter((item) => {
      if (this.q1Answers === "countertop") {
        return item.function === this.q2Answers || this.q2Answers === "皆可"
      } else {
        return (
          (item.voltage === this.q2Answers || this.q2Answers === "皆可") &&
          (item.heights.includes(this.q3Answers) ||
            this.q3Answers === "獨立擺放無限制") &&
          (item.priceRange === this.q4Answers ||
            this.q4Answers === "無預算限制")
        )
      }
    })

    resultAnswers.forEach((item) => {
      if (item.brand === "Miele") {
        this.mieleModel.push(item)
      } else if (item.brand === "BERTAZZONI") {
        this.bertazzoniModel.push(item)
      } else if (item.brand === "Whirlpool") {
        this.whirlpoolModel.push(item)
      } else if (item.brand === "KE") {
        this.keModel.push(item)
      }
    })
  },

  async screenShot() {
    this.quizTitle = "問卷結果"
    if (this.q1Answers === "countertop") {
      this.showQuestion = "countertop"
    } else {
      this.showQuestion = "others"
    }
    await this.$nextTick()
    const result = await snapdom(capture, { scale: 2 })
    await result.download({ format: "png", filename: "問卷結果" })

    this.showQuestion = ""
    this.quizTitle = "品牌推薦與問卷下載"
  },
}

window.addEventListener("load", () => {
  // --- 1. 變數宣告與常數 ---

  // DOM 元素
  const goToTop = document.getElementById("go-to-top")
  const quizPosition = document.querySelector("#quiz-position")
  // const capture = document.querySelector("#capture")
  const formNextBtn = document.querySelector(".form-next-btn")
  const topTitle = document.querySelector(".top-title")

  // 動畫相關元素
  const circleCards = document.querySelectorAll(".circle-card")
  const squareCards = document.querySelectorAll(".square-card")
  const bgDecorate = document.querySelectorAll(".bg-decorate")

  // --- 2. 輔助函式 ---

  // 處理視窗大小變更
  const resizeHandle = () => {
    ScrollTrigger.update()
  }

  // --- 3. 初始化 ---

  // Swiper 初始化
  const brandSwiperInstance = new Swiper(".brand-swiper", {
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
  // GSAP 動畫初始化
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
            // toggleActions: "play none none reverse",
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
            // toggleActions: "play none none reverse",
            // markers: true, // 除錯時開，正式環境記得關
            invalidateOnRefresh: true, // 尺寸變更時重新取 start
          },
        })
      })
    },
  )

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
    duration: 1,
    stagger: 0.5, // 每個間隔 0.3 秒進場
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

  // 視窗大小變更
  window.addEventListener("resize", resizeHandle)

  // 執行一次 resize 處理
  resizeHandle()
})
