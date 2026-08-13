// src/data/recipes.js

// Исходные рецепты (только для первого запуска)
const initialRecipes = [
    {
        id: 1,
        name: "Овсяноблин",
        recipe: "2стл овсянки(лучше перемолотой), 1 яйцо, 1стл йогурта натурального или кефира, 1чл с горкой какао, чуть соли, подсластитель(или без), 1/4 чл соды.  Все смешать. Жарить на а/п сковороде с двух сторон.  Начинка:  1 банан, 1 чл арахисовой пасты, 1 чл меда",
        ganre: "breakfast",
        image: "https://hochu-gotovit.ru/wp-content/uploads/2018/06/Uc9pDFINz1U-600x380.jpg"
    },
    {
        id: 2,
        name: "Омлет с грибами",
        recipe: "2 яйца, 100 гр творога, 50 мл молока, 60 гр грибов, соль, перец.  Все хорошо перемешать. Грибочки чуть обжарить и залить яичной смесью. Жарить на медленном огне под крышкой до готовности",
        ganre: "supper",
        image: "https://img.iamcook.ru/old/upl/recipes/zen/u-a7d90734e323788cc2ecf67dc602a319.JPG"
    },
    {
        id: 3,
        name: "Куриные тефтели с грибами",
        recipe: "Курогрудка, грибочки, лук, морковка, специи.  Все измельчить блендером,слепить тефтели, потушить с томатной пастой и водичкой",
        ganre: "dinner",
        image: "https://img.povar.ru/main/bd/e3/78/07/kurinie_tefteli_s_gribami-184131.jpg"
    },
    {
        id: 4,
        name: "Капустный пирог",
        recipe: "1 большой лавашный лист делим пополам (160г),  натуральный йогурт 220 гр,  4 отваренных вкрутую яйца, 350 гр пекинской капусты, перец и соль.  Шинкуем и тушим капусту (3-5 мин без масла), крошим яйца. Одну половину лаваша смазываем йогуртом/ сверху яйца/ затем капуста/ соль/ перец.  Укладываем сверху второй лист лаваша и повторяем: йогурт/яйца/капуста/соль,перец. Сворачиваем рулет. Cмазываем яичным желтком и немного присыпаем сыром (~20гр). Выпекаем в духовке 25 мин при 180 градусах.",
        ganre: "breakfast",
        image: "https://static.1000.menu/img/content-v2/92/a6/33557/pirog-iz-lavasha-s-kapustoi_1585637148_5_max.jpg"
    },
    {
        id: 5,
        name: "Каша Дружба",
        recipe: "Крупа пшеничная 40 гр, крупа рисовая 40 гр.  Смешать и замочить на ночь. Утром добавить 250 мл воды и отварить до выкипания. Затем добавить 250 мл молока горячего и поварить до полуготовности,чуть посолить. Варим без сахара, в готовую кашу можно добавить мед/ягод",
        ganre: "breakfast", 
        image: "https://img.povar.ru/main/8b/3b/36/03/kasha_quotdrujbaquot-271430.JPG"
    },
    {
        id: 6,
        name: "Оладьи на кефире",
        recipe: "На 2 порции - 250 мл кефира, 1 банан пюрировать, 1 яйцо, 130 гр рисовой муки, 1 чл растительного масла, сода 1/2 чл, ваниль, подсластитель (можно без)- все хорошо перемешать. Выпекать на а/п сковороде без масла",
        ganre: "breakfast", 
        image: "https://static.1000.menu/img/content-v2/d3/e8/24736/oladi-ochen-pyshnye-na-kefire_1594324969_14_max.jpg"
    },
    {
        id: 7,
        name: "Ленивые голубцы",
        recipe: "Куриная грудка (700 гр), 1 яйцо, лук, морковь, капуста (300 гр).   Овощи бжикнуть блендером по отдельности, грудку прокрутить через мясорубку или тоже блендером. Смешать все ингридиенты и слепить голубцы. Выложить в форму для запекания, залить соусом (томатная паста 3 стл, вода, зелень) и убрать в духовку на 40 мин при 180.",
        ganre: "dinner",
        image: "https://gotovimop.com/wp-content/uploads/2019/06/lenivye-golubcy-v-duhovke.jpg"
    },
    {
        id: 8,
        name: "Салат витаминный",
        recipe: "Отвариваем свеклу (сладкий сорт) и режем ее кубиками (150-200 гр).  Очищаем максимально грейпфрут от кожицы для удаления горечи (80-100 гр). Рвём салатный лист (100 гр). Добавляем любой мягкий сыр (60-80 гр).  Заправка:  масло 1 чл, мёд 1/2чл, бальзамический уксус 1 чл.  Соль и травы по вкусу.  Украсить можно кедровыми орешками ",
        ganre: "snack",
        image: "https://edabez.ru/wp-content/uploads/2018/06/1-18.jpg"
    },
    {
        id: 9,
        name: "Ягодный мусс",
        recipe: "Ингредиенты:  творог 0-2% мягкий 200гр, молоко 100гр, ванилин, сахарозаменитель, ягодною пюре 120 гр (ягоды любые перетереть), желатин 1 пакетик 10гр. Разводим желатин по инструкции в молоке и оставляем на час нагреваем.  При помощи блендера взбиваем все ингредиенты и пробуем на вкус. Разливаем в пиалки и даем застыть.",
        ganre: "supper",
        image: "https://img.iamcook.ru/2018/upl/recipes/zen/u6009-3f8fb8784875fbd29b71abf80ab14d4f.jpg"
    },
    {
        id: 10,
        name: "ПП пицца",
        recipe: "Овсяная крупа 40гр, молоко 2,5% - 30гр, яйцо 1 шт, соль, перец по вкусу.  Печем блин под крышкой на капле масла.  Чуть схватится верх - выкладываем начинку и еще под крышку на пару минут.  Для начинки:  куриная грудка (отварная/запеченная) 50гр, томат паста 30гр, огурец маринованный 100гр, сыр 30гр",
        ganre: "breakfast", 
        image: "https://static.1000.menu/img/content-v2/07/ab/50363/pp-picca-na-kurinom-farshe-vmesto-testa_1600711958_15_max.jpg"
    },
    {
        id: 11,
        name: "Ленивый хачапури",
        recipe: "120 гр творога (из брикета не зернистого), 1 яйцо, 30 гр твёрдого сыра, 30 мл йогурта натурального (если творог мокрый можно не добавлять), 1 стл кукурузной муки, 1.5 стл молотой овсянки, зелень, соль, перец. Сыр потереть на терке. Все смешать и на а/п сковороде под крышкой поджарить с двух сторон.",
        ganre: "breakfast", 
        image: "https://lady-day.ru/wp-content/uploads/2018/08/hachapuri-14.jpg"
    },
    {
        id: 12,
        name: "Творожная запеканка с бананом и яблоком",
        recipe: "300 гр творога, 2 яйца, 1 банан, 1 яблоко, ваниль, сах зам.  Пюрировать банан и потереть яблоко, смешать все ингридиенты и в духовку при 180* на 45 мин",
        ganre: "snack",
        image: "https://s1.eda.ru/StaticContent/Photos/121004175948/150718133129/p_O.jpg"
    },
    {
        id: 13,
        name: "Овсяные панкейки",
        recipe: "Берем овсяные хлопья (можно измельчить) 50 г, кефир 100 г, яйцо 1 шт, сода 1/3 чл, сах зам по желанию.   Смешиваем все ингредиенты и жарим на капле масла на антипригарной сковороде.",
        ganre: "breakfast",
        image: "https://img.povar.ru/main/cd/0e/fe/89/ovsyanie_dieticheskie_pankeiki_-387398.png"
    },
    {
        id: 14,
        name: "Лимонные сырники",
        recipe: "Творог 200 гр до 5%, 1 белок(или желток), 1 чл лимонной цедры, 2 ст л муки (рисовой, кукурузной или овсяной без горки), ваниль.  Все смешать и жарить на а/п сковороде. Пполить 2 чл меда или ягод добавить (или добавить сах зам в сырники)",
        ganre: "breakfast",
        image: "https://avatars.mds.yandex.net/i?id=14e66a2963bfb7ddebb6b56c94e951f07809f52ab10d9a7f-12140636-images-thumbs&n=13"
    },
    {
        id: 15,
        name: "Веер из баклажана",
        recipe: "1 баклажан, 2стл йогурта натурального, 1/2 небольшой помидоры, сыр 30 гр (адыгейский или брынза), 10 гр сыр твёрдый, соль, специи.  Баклажан надрезаем вдоль до корешка. Посолить все слои и оставляем минут на 10. В это время помидорку режем кружками, брынзу полосочками, твёрдый сыр трём на терке.  Для соуса смешиваем йогурт, соль и специи. Затем промываем баклажан от соли, промазываем слои йогуртовым соусом и выкладываем брынзу и помидорку между слоями баклажана. Сверху посыпаем твёрдым сыром и ставим в духовку на 30 мин при 180",
        ganre: "supper",
        image: "https://rutxt.ru/files/14306/original/3062ae4cfb.JPG"
    },
    {
        id: 16,
        name: "Куриные грудки, тушеные с луком и морковью",
        recipe: "Одну луковицу и морковку обжарить на капле масла. Затем добавить мелко порезанные грудки. Тушить под крышкой на медленном огне. Минут через 10 добавить томатную пасту, воду и специи",
        ganre: "dinner",
        image: "https://avatars.mds.yandex.net/i?id=065f07483b62756d0ac24e40a846a7eb97758faf-5869507-images-thumbs&n=13"
    },
    {
        id: 17,
        name: "Рыба, запеченная в фольге",
        recipe: "Рыбку натираем специями, добавляем кусочки лимона, можно морковку еще потереть.  Всё заворачиваем в фольгу и запекаем в духовке минут 30 при 180 гр.",
        ganre: "dinner",
        image: "https://avatars.mds.yandex.net/i?id=f30d04b7874a67be6dadd6e79904a46ca3369293-8249293-images-thumbs&n=13"
    },
    {
        id: 18,
        name: "Гуляш из индейки",
        recipe: "Мясо индейки порезать маленькими кусочками, обжарить на капле масла, добавить соль, специи, томатную пасту (3 стл) и воду. Можно добавить сладкий перец и морковь. Тушить на медленном огне до готовности",
        ganre: "dinner",
        image: "https://avatars.mds.yandex.net/i?id=c072926900feee7f63b47c6dae1e0b6925b65e30-5235913-images-thumbs&n=13"
    },
    {
        id: 19,
        name: "Корейская морковка с куриными сердечками",
        recipe: "Две большие морковки почистить и потереть на терке. 300 гр сердечек(в сыром виде) отварить на медленном огне до готовности (около 25 мин), остудить и порезать. Смешать морковь и сердечки. Добавить соль, перец, специи для корейской морковки, масло растительное (2чл) и немного уксус. Все перемешать и оставить настояться 30-40 мин",
        ganre: "supper",
        image: "https://avatars.mds.yandex.net/i?id=3b12d6200e9fa9ba3f237306f81c30175515a59e-11951579-images-thumbs&n=13"
    },
    {
        id: 20,
        name: "Салат из куриной грудки",
        recipe: "Нарезать соломкой отварную грудку (~ 70 гр), так же порезать помидор, огурец  и салат айсберг.  Заправка:  йогурт натуральный 20-30г, горчица 1/2 ч/л, капля лимона, специи, соль (это аналог майонеза - очень вкусно)",
        ganre: "supper",
        image: "https://avatars.mds.yandex.net/i?id=555b637b6d8b707718762c82e048a3e680d2b1bd-10107372-images-thumbs&n=13"
    },
    {
        id: 21,
        name: "Лодочки из кабачков фаршированные",
        recipe: "Нам понадобятся кабачки среднего размера, куриная грудка, помидоры, йогурт, зелень, чеснок и сыр. Кабачки разрезать вдоль и вырезать аккуратно ножом или ложкой сердцевину. Лук и чеснок мелко нашинковать, выложить на сухую сковороду и слегка обжарить. Добавить порезанные сердцевины кабачков, чуть обжарить, затем добавить порезанное филе и приготовить до полуготовности. Посолить, добавить томатную пасту и ещё потушить до полного испарения воды. Выложить начинку в заготовки из кабачков, сверху положить помидорку и посыпать сыром. Поставить в духовку на 30 мин при 180*. Готовые лодочки посыпать зеленью",
        ganre: "supper",
        image: "https://avatars.mds.yandex.net/i?id=92e6553d54c49618f3792d4c4d01eeb5c6f785b6-4231391-images-thumbs&n=13"
    },
    {
        id: 22,
        name: "Смузи",
        recipe: "В 200 мл кефира добавить 50гр любых ягод и 20 гр семян льна. Всё тщательно взбить блендером",
        ganre: "snack",
        image: "https://avatars.mds.yandex.net/i?id=9a8b1e31750dcbcb62fbbae8654e1086026d113b-4936239-images-thumbs&n=13"
    },
    {
        id: 23,
        name: "ПП мороженое",
        recipe: "Хорошо вызревший банан ломаем на небольшие кусочки и складываем в контейнер или пакетю Отправляем в морозильную камеру на ночь. Затем перекладываем фрукты в блендер (по желанию добавляем молоко) и взбиваем смесь до получения ровной консистенции.",
        ganre: "snack",
        image: "https://avatars.mds.yandex.net/i?id=055152788fb4535f6db4b192f3c5b2cb1d8c65a5-5250851-images-thumbs&n=13"
    },
    {
        id: 24,
        name: "Морковный блинчик",
        recipe: "Половинку средней морковки натереть на мелкой терке.  Добавить 1 яйцо, 1.5 ст.ложки рисовой муки (можно кукурузной), 1.5 ст ложки кефира, ваниль, разрыхлитель, корицу.  Все перемешать и выпекать блинчик на сковороде с двух сторон под крышкой. Готовый блинчик разрезать, промазать мягким творогом. Можно добавить 1 чл меда",
        ganre: "breakfast",
        image: "https://avatars.mds.yandex.net/i?id=869cd6e0cbc9b39726c183f29f52b8d2bb894ecc-8899644-images-thumbs&n=13"
    },
    {
        id: 25,
        name: "Творожная запеканка в МВ",
        recipe:"1 яйцо, 100 гр творога, 50 гр фруктовое пюре, 50гр ряженки или кефира, 1 стл рисовой муки, сахзам по вкусу.  Все смешать или взбить в блендере и в МВ на 3-4 минуты.  Можно сверху выложить фрукты",
        ganre: "breakfast",
        image: "https://images.pexels.com/photos/13949893/pexels-photo-13949893.jpeg"
    },
        {
        id: 26,
        name: "Рисовый блин с сыром",
        recipe: "1 яйцо, 1 ст/л рисовой муки, 3 ст/л кефир или йогурт, разрыхлитель.  Все перемешать. Жарить на среднем огне с одной стороны. Выложить сыр на 1 половину и накрыть второй.Накрыть крышкой и жарить, пока сыр не расплавится.",
        ganre: "breakfast",
        image: "https://p7.tabor.ru/feed/2024-05-25/45524121/4674920_760x500.jpg"
    },
    {
        id: 27,
        name: "Пирожное за 5 минут",
        recipe: "Половинка банана, 1 яйцо, 1 ст/л рисовой муки, 1 ст/л какао, 1 ст/л молока, разрыхлитель, сахзам по вкусу.  Спелый банан размять вилкой, добавить все ингредиенты, перемешать и выпекать в МВ 2-3 минуты. Готовую основу остудить, разрезать, промазать мягким творогом. Можно добавить сахзам и ягоды",
        ganre: "breakfast",
        image: "https://i.pinimg.com/originals/d6/a4/bb/d6a4bbb502ee8487c2e95eabf57fe62e.png"
    },
        {
        id: 28,
        name: "Завтрак из двух яиц",
        recipe: "2 яйца, 1 ст/л муки с горкой, 4 ст/л воды, соль по вкусу, укроп или зеленый лук по желанию. Все смешать. Жарить на антипригарной сковородке на среднем огне, как блины - тонким слоем с двух сторон",
        ganre: "breakfast",
        image: "https://i.pinimg.com/1200x/7e/74/dc/7e74dc5052c7226b020e1159763e109f.jpg"
    }
];

// Ключ для localStorage
const STORAGE_KEY = 'cookbook_recipes';

// Загрузка рецептов из localStorage или начальных данных
const loadRecipes = () => {
    const savedRecipes = localStorage.getItem(STORAGE_KEY);
    if (savedRecipes) {
        return JSON.parse(savedRecipes);
    }
    return initialRecipes;
};

// Сохранение рецептов в localStorage
const saveRecipes = (recipes) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
};

// Экспортируем текущие рецепты (загружаем при старте)
export let recipes = loadRecipes();

// Функция для получения уникальных категорий
export const getCategories = () => {
    const categories = [...new Set(recipes.map(recipe => recipe.ganre))];
    return ["all", ...categories];
};

// Функция для получения рецепта по ID
export const getRecipeById = (id) => {
    return recipes.find(recipe => recipe.id === parseInt(id));
};

// Функция для фильтрации рецептов
export const filterRecipes = (searchTerm, category) => {
    let filtered = [...recipes];
    
    if (searchTerm) {
        filtered = filtered.filter(recipe =>
            recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    if (category && category !== "all") {
        filtered = filtered.filter(recipe => recipe.ganre === category);
    }
    
    return filtered;
};

// Функция для добавления нового рецепта
export const addRecipe = (newRecipe) => {
    const maxId = Math.max(...recipes.map(r => r.id), 0);
    const recipeWithId = {
        ...newRecipe,
        id: maxId + 1
    };
    recipes.push(recipeWithId);
    saveRecipes(recipes);
    return recipeWithId;
};

// Функция для обновления рецепта
export const updateRecipe = (updatedRecipe) => {
    const index = recipes.findIndex(recipe => recipe.id === updatedRecipe.id);
    if (index !== -1) {
        recipes[index] = { ...recipes[index], ...updatedRecipe };
        saveRecipes(recipes);
        return true;
    }
    return false;
};

// Функция для удаления рецепта
export const deleteRecipe = (id) => {
    const index = recipes.findIndex(recipe => recipe.id === id);
    if (index !== -1) {
        recipes.splice(index, 1);
        saveRecipes(recipes);
        return true;
    }
    return false;
};

// Функция для экспорта рецептов в JSON (для бэкапа)
export const exportRecipes = () => {
    const dataStr = JSON.stringify(recipes, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `cookbook_backup_${new Date().toISOString().slice(0,19)}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
};

// Функция для импорта рецептов из JSON
export const importRecipes = (jsonFile) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedRecipes = JSON.parse(e.target.result);
                if (Array.isArray(importedRecipes)) {
                    recipes = importedRecipes;
                    saveRecipes(recipes);
                    resolve(importedRecipes);
                } else {
                    reject(new Error('Неверный формат файла'));
                }
            } catch (error) {
                reject(error);
            }
        };
        reader.onerror = reject;
        reader.readAsText(jsonFile);
    });
};

// Функция для сброса к начальным рецептам
export const resetToDefault = () => {
    recipes = [...initialRecipes];
    saveRecipes(recipes);
    return recipes;
};

// Перевод жанров на русский
export const getGenreName = (genre) => {
    const genres = {
        "breakfast": "Завтрак",
        "supper": "Ужин",
        "dinner": "Обед",
        "snack": "Перекус/Десерт"
    };
    return genres[genre] || genre;
};

// Функция для форматирования текста рецепта
export const formatRecipeText = (text) => {
    if (!text) return '';
    let formatted = text;
    
    // 1. Разбиваем по запятым с пробелом
    formatted = formatted.replace(/,/g, ',\n');
    
    // 2. Разбиваем по двум пробелам (заменяем на перенос строки)
    formatted = formatted.replace(/  /g, '\n');
    
    // 3. Убираем лишние пробелы после переноса строки
    formatted = formatted.replace(/\n\s+/g, '\n');

    // 4. Убираем множественные переносы строк (оставляем максимум 2 подряд)
    formatted = formatted.replace(/\n{3,}/g, '\n\n');
    
    // 5. Добавляем пробел после точки с запятой для читаемости (опционально)
    formatted = formatted.replace(/;\s*/g, ';\n');
    
    return formatted.trim();
};

// Функция для форматирования с маркированным списком ингредиентов
export const formatIngredientsList = (text) => {
    if (!text) return '';
    
 // Разбиваем по запятым, двум пробелам или точкам с запятой
    const items = text.split(/, (?![0-9])|  |;\s*/);

// Фильтруем пустые элементы и форматируем каждый с маркером •
    return items
        .filter(item => item.trim())
        .map(item => `• ${item.trim()}`)
        .join('\n');
};
