export const mockRestaurants = [
  {
    id: 1,
    name: "BIOeBao Western",
    address: "Район Чаоян, Пекин",
    city: "Пекин",
    latitude: 39.9042,
    longitude: 116.4074,
    rating: 4.8,
    phone: "+86 10 1234 5678",
    working_hours: "10:00-22:00",
    description: "Ресторан с традиционной русской кухней в современной интерпретации.",
    image: "https://share.google/UFsYpopS0JqSPpSWS"
  },
  {
    id: 2,
    name: "ManqGuo EShi",
    address: "Район Пудун, Шанхай",
    city: "Шанхай",
    latitude: 31.2304,
    longitude: 121.4737,
    rating: 4.9,
    phone: "+86 21 8765 4321",
    working_hours: "11:00-23:00",
    description: "Аутентичная русская кухня в уютной атмосфере домашнего уюта.",
    image: "https://share.google/UFsYpopS0JqSPpSWS"
  },
  {
    id: 3,
    name: "Roma Bar And Restaurant",
    address: "Район Тяньхэ, Гуанчжоу",
    city: "Гуанчжоу",
    latitude: 23.1291,
    longitude: 113.2644,
    rating: 4.6,
    phone: "+86 20 5555 6666",
    working_hours: "09:00-21:00",
    description: "Современный ресторан с блюдами русской и европейской кухни.",
    image: "https://share.google/UFsYpopS0JqSPpSWS"
  },
  {
    id: 4,
    name: "Русский Дом",
    address: "Район Хайдянь, Пекин",
    city: "Пекин",
    latitude: 39.9834,
    longitude: 116.3229,
    rating: 4.7,
    phone: "+86 10 2345 6789",
    working_hours: "11:00-23:00",
    description: "Классическая русская кухня в традиционной обстановке.",
    image: "https://share.google/UFsYpopS0JqSPpSWS"
  },
  {
    id: 5,
    name: "Сибирский Медведь",
    address: "Район Хункоу, Шанхай",
    city: "Шанхай",
    latitude: 31.2500,
    longitude: 121.4800,
    rating: 4.5,
    phone: "+86 21 9876 5432",
    working_hours: "10:00-22:00",
    description: "Ресторан сибирской кухни с акцентом на мясные блюда и выпечку.",
    image: "https://share.google/UFsYpopS0JqSPpSWS"
  },
  {
    id: 6,
    name: "Матрешка",
    address: "Район Наньшань, Шэньчжэнь",
    city: "Шэньчжэнь",
    latitude: 22.5328,
    longitude: 113.9305,
    rating: 4.4,
    phone: "+86 755 1111 2222",
    working_hours: "12:00-24:00",
    description: "Современный ресторан русской кухни с живой музыкой.",
    image: "https://share.google/UFsYpopS0JqSPpSWS"
  },
  {
    id: 7,
    name: "Тройка",
    address: "Район Байюнь, Гуанчжоу",
    city: "Гуанчжоу",
    latitude: 23.1815,
    longitude: 113.2707,
    rating: 4.3,
    phone: "+86 20 3333 4444",
    working_hours: "08:00-20:00",
    description: "Уютное кафе с домашней русской кухней и свежей выпечкой.",
    image: "https://share.google/UFsYpopS0JqSPpSWS"
  },
  {
    id: 8,
    name: "У Самовара",
    address: "Район Дунчэн, Пекин",
    city: "Пекин",
    latitude: 39.9289,
    longitude: 116.4150,
    rating: 4.8,
    phone: "+86 10 3456 7890",
    working_hours: "09:00-21:00",
    description: "Традиционный русский ресторан с самоварами.",
    image: "https://share.google/UFsYpopS0JqSPpSWS"
  },
  {
    id: 9,
    name: "Бабушкин Пирог",
    address: "Район Минхан, Шанхай",
    city: "Шанхай",
    latitude: 31.2100,
    longitude: 121.4300,
    rating: 4.6,
    phone: "+86 21 1111 2222",
    working_hours: "08:00-20:00",
    description: "Пироги и выпечка по домашним рецептам.",
    image: "https://share.google/UFsYpopS0JqSPpSWS"
  },
  {
    id: 10,
    name: "Царская Охота",
    address: "Район Футянь, Шэньчжэнь",
    city: "Шэньчжэнь",
    latitude: 22.5415,
    longitude: 114.0596,
    rating: 4.7,
    phone: "+86 755 3333 4444",
    working_hours: "11:00-23:00",
    description: "Ресторан охотничьей кухни с дичью и грибами.",
    image: "https://share.google/UFsYpopS0JqSPpSWS"
  }
];

export const mockRestaurantMenu = {
  1: {
    popular: [
      {id: 1, name: "Борщ украинский", price: 550, weight: "400г", description: "Наваристый суп со свеклой и сметаной"},
      {id: 2, name: "Блины с икрой", price: 850, weight: "300г", description: "Тонкие блины с красной икрой"},
      {id: 3, name: "Пельмени сибирские", price: 650, weight: "350г", description: "Ручной лепки с говядиной и свининой"},
      {id: 4, name: "Оливье", price: 450, weight: "300г", description: "Классический салат с колбасой"},
      {id: 5, name: "Бефстроганов", price: 750, weight: "350г", description: "Говядина в сметанном соусе с картофелем"},
      {id: 6, name: "Котлеты по-киевски", price: 850, weight: "400г", description: "Куриное филе с маслом и зеленью"}
    ],
    soups: [
      {id: 7, name: "Солянка сборная", price: 550, weight: "400г", description: "Густой суп с разными видами мяса"},
      {id: 8, name: "Уха царская", price: 650, weight: "400г", description: "Из трех видов рыбы с водкой"},
      {id: 9, name: "Щи кислые", price: 450, weight: "400г", description: "Капустные щи на говяжьем бульоне"},
      {id: 10, name: "Рассольник", price: 480, weight: "400г", description: "С перловкой и солеными огурцами"}
    ],
    mains: [
      {id: 11, name: "Шашлык из свинины", price: 950, weight: "500г", description: "На углях с аджикой"},
      {id: 12, name: "Голубцы", price: 550, weight: "350г", description: "С фаршем и рисом в томатном соусе"},
      {id: 13, name: "Жаркое в горшочке", price: 750, weight: "450г", description: "Свинина с картофелем и грибами"},
      {id: 14, name: "Куриные крылышки", price: 650, weight: "400г", description: "Запеченные в медово-горчичном соусе"},
      {id: 15, name: "Телячьи медальоны", price: 1200, weight: "350г", description: "С трюфельным соусом"}
    ],
    salads: [
      {id: 16, name: "Сельдь под шубой", price: 480, weight: "300г", description: "Классическая селедка с овощами"},
      {id: 17, name: "Винегрет", price: 380, weight: "300г", description: "Овощной салат с растительным маслом"},
      {id: 18, name: "Греческий", price: 520, weight: "350г", description: "С сыром фета и оливками"},
      {id: 19, name: "Цезарь с курицей", price: 650, weight: "350г", description: "С пармезаном и соусом цезарь"}
    ],
    desserts: [
      {id: 20, name: "Медовик", price: 350, weight: "200г", description: "Торт с медовыми коржами"},
      {id: 21, name: "Пирожки с вишней", price: 280, weight: "250г", description: "Домашние пирожки из печи"},
      {id: 22, name: "Блины с вареньем", price: 320, weight: "300г", description: "С малиновым вареньем"},
      {id: 23, name: "Тирамису", price: 450, weight: "200г", description: "Итальянский десерт"}
    ],
    drinks: [
      {id: 24, name: "Квас домашний", price: 200, weight: "500мл", description: "Хлебный квас"},
      {id: 25, name: "Морс клюквенный", price: 180, weight: "500мл", description: "Свежевыжатый морс"},
      {id: 26, name: "Компот из сухофруктов", price: 150, weight: "500мл", description: "Традиционный компот"},
      {id: 27, name: "Чай с травами", price: 120, weight: "300мл", description: "Чай в самоваре"}
    ]
  },
  2: {
    popular: [
      {id: 28, name: "Борщ с пампушками", price: 580, weight: "400г", description: "С чесночными пампушками"},
      {id: 29, name: "Блины с лососем", price: 920, weight: "300г", description: "С копченым лососем и сливочным сыром"},
      {id: 30, name: "Уральские пельмени", price: 680, weight: "350г", description: "С говядиной и бараниной"},
      {id: 31, name: "Столичный салат", price: 520, weight: "300г", description: "С курицей и картофелем"},
      {id: 32, name: "Гуляш", price: 780, weight: "350г", description: "Говядина в томатном соусе"},
      {id: 33, name: "Цыпленок табака", price: 890, weight: "500г", description: "Цыпленок под прессом"}
    ],
    soups: [
      {id: 34, name: "Харчо", price: 580, weight: "400г", description: "Острый суп с бараниной"},
      {id: 35, name: "Ботвинья", price: 520, weight: "400г", description: "Холодный суп с рыбой"},
      {id: 36, name: "Лапша куриная", price: 450, weight: "400г", description: "Домашняя лапша с курицей"}
    ],
    mains: [
      {id: 37, name: "Баранина на косточке", price: 1100, weight: "600г", description: "Запеченная с травами"},
      {id: 38, name: "Стейк из лосося", price: 1250, weight: "400г", description: "С лимонным соусом"},
      {id: 39, name: "Фаршированный перец", price: 650, weight: "350г", description: "С мясом и рисом"}
    ],
    desserts: [
      {id: 40, name: "Наполеон", price: 380, weight: "200г", description: "Слоеный торт"},
      {id: 41, name: "Пряники тульские", price: 250, weight: "200г", description: "С имбирной глазурью"},
      {id: 42, name: "Чак-чак", price: 320, weight: "250г", description: "Татарская сладость"}
    ]
  }
};

export const initialReviews = [
  {
    id: 1,
    restaurant_id: 1,
    author_name: "Алексей И.",
    rating: 5,
    text: "Этот сервис стал настоящим спасением для меня. Благодаря точной карте и отзывам нашел отличный ресторан с борщом как у бабушки.",
    created_at: "2023-10-15T14:30:00Z"
  },
  {
    id: 2,
    restaurant_id: 2,
    author_name: "Мария С.",
    rating: 4,
    text: "Отличное место! Блины просто восхитительные, как в детстве. Обслуживание на высоте.",
    created_at: "2023-11-20T18:45:00Z"
  },
  {
    id: 3,
    restaurant_id: 1,
    author_name: "Дмитрий К.",
    rating: 5,
    text: "Лучшие пельмени в городе! Обязательно вернусь снова. Цены адекватные, порции большие.",
    created_at: "2023-12-05T12:15:00Z"
  },
  {
    id: 4,
    restaurant_id: 3,
    author_name: "Ольга В.",
    rating: 4,
    text: "Уютная атмосфера, вкусная еда. Рекомендую борщ и пирожки.",
    created_at: "2023-12-10T20:30:00Z"
  },
  {
    id: 5,
    restaurant_id: 4,
    author_name: "Иван П.",
    rating: 5,
    text: "Настоящая русская кухня! Как будто вернулся домой. Особенно понравился шашлык.",
    created_at: "2023-12-12T14:20:00Z"
  }
];