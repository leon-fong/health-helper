<template>
  <div class="eat-suggestion" v-if="isShow">
    <div class="item">
      <span class="title"> 血压情况 </span>
      <span class="result">{{ report.blood?.bloodPressureDesc }}</span>
    </div>
    <div class="box">{{ suggestion[report.blood?.bloodPressureDesc] }}</div>

    <div class="item">
      <span class="title"> 血糖情况 </span>
      <span class="result">{{ report.blood?.bloodSugarDesc }}</span>
    </div>
    <div class="box">{{ suggestion[report.blood?.bloodSugarDesc] }}</div>

    <div class="item" @click="isShowTip = true">
      <span class="title">
        BMI
        <nut-icon name="ask" size="12"></nut-icon>
      </span>
      <span class="result">{{ report.weight?.bmi }}{{ report.weight?.bmiDesc }}</span>
    </div>
    <div class="box">{{ suggestion[report.weight?.bmiDesc] }}</div>
  </div>
  <div v-else style="text-align: center">
    <h3>{{ tips }}</h3>
  </div>

  <nut-popup round :style="{ padding: '10px 15px', textAlign: 'justify' }" v-model:visible="isShowTip" :z-index="100">
    BMI的正常值在18.5至24之间，体重指数BMI是衡量胖瘦的常用标准，计算方法是体重(千克)/身高(米)的平方。低于18.5考虑有营养不良、消瘦，超过23是有超重或者肥胖现象。
  </nut-popup>
</template>

<script setup>
import { ref } from 'vue'
import { healthReport } from '~@/apis/profile.js'
const suggestion = {
  高压偏高:
    '建议以谷类食物为主，要适量吃鱼、虾、蛋、肉等食物，建议每天吃鱼虾类、肉类以及蛋类等各约25-50g，少吃或不吃高钠、高脂以及高胆固醇的动物性食物，优选脱脂或低脂牛奶、酸奶等，每天奶类的摄入量约在200-300g等。',
  高压正常:
    '在饮食方面不要摄入太多钠盐，钠盐摄入量可能会引起血压的增高。每天饮酒量超过五十克乙醇的患者患有高血压的几率也会明显增高，每天饮酒量要适量。脑力劳动者高血压的患病率要明显超过体力劳动从事者，精神紧张度高的职业者发生高血压的可能性比较大，长期生活在噪音环境中，听力见敏感性减退者患有高血压也比较多。经过休息之后往往症状和血压可以获得一定的改善。',
  高压偏低:
    '从平常饮食方面入手，注意清淡饮食，不吃辛辣刺激性食物和过于油腻的食物，同时在生活方面，要养成良好的生活习惯，多进行运动锻炼，多做有氧运动，尽量不要熬夜，每天都要保证有充足的睡眠时间和高质量的睡眠。',
  低压偏低:
    '建议处于低血压状态的患者，日常生活中严格制定饮食计划，多摄入蛋白质、维生素B群、钙、钾、镁等矿物质，如乳品、肉类、黄豆制品、深绿色蔬菜。咖啡、酒精或是咖啡因含量较高的饮料，应避免过量饮用。',
  低压正常: '多吃一些蔬菜，水果，尤其是深色蔬菜;适当增加海产品摄入;多吃含钾丰富的食物;宜吃钙含量丰富食物，可每天一杯石斛',
  低压偏高:
    '血压不是很高，一级高血压，主要通过饮食，适当的运动，改善不良的生活方式来控制血压，比如低盐饮食，不要熬夜，戒烟戒酒，适当的运动控制体重，注意均衡营养，多吃蔬菜粗粮。血压过高，二级或三级高血压，或是通过以上方式血压仍然控制不下来，就需要药物治疗来降压。一般常用的降压药物有五大类，包括氨苯蝶啶、普萘洛尔等。',
  血糖偏高: '患有高血糖的人饮食一定要以清淡为主，限制盐分摄入，及时戒烟戒酒，饮食量也应该控制好，需要补充足够的膳食纤维，多吃豆制品食物和充足水分。',
  血糖正常: '平时注意控制饮食，三餐定时定量，低脂低糖摄入，多食用蔬菜，加强体育锻炼，保持良好的心态，定期监测血糖，保持血糖的平稳，防止并发症的出现。',
  血糖偏低:
    '患者会出现头晕，乏力等症状，多吃膳食纤维尽量选用天然膳食纤维的蔬菜，芹菜，竹笋等，少吃多餐，食物的种类一定要保证多样化，保证营养的食物，多吃一些蔬菜，糙米，坚果，瘦肉，鱼肉，牛奶，鸡蛋等食物',
  偏瘦: '多吃甜品，注意量要适当，每天午饭后吃一点甜品。多吃肉制品，肥猪肉少吃，肉太过油腻，对胃不好。可多吃鱼肉，牛肉和鸡肉。肉营养丰富且比较健康，能增加体内蛋白质含量，帮助身体增加肌肉。',
  正常: '饮食上应该要注意饮食的营养均衡，不挑食，不节食。少吃高脂肪的食物，多吃低热量低脂肪的食物和水果。可以适量地吃些瘦肉，补充蛋白质。培养健康的饮食习惯，定时定量，不能暴饮暴食，也不能节食；粗细搭配，多喝水，尽量喝温水，避免喝含糖饮料或者酒精饮料。',
  过重: '控制饮食和增加体育锻炼为主，防治向肥胖演变，使每日总热量低于消耗量，女性要求限制进食量在1200~1500千卡/日，男性应控制在1500~1800千卡/日食物中要能添加适量含必需氨基酸的动物性蛋白（占总蛋白量的1/3较为合适），蛋白质摄入量每日每千克体重不少于1克。',
  肥胖: '肥胖人群不建议采用跑步跳绳的对膝关节冲击较大的运动来减脂，应遵循循序渐进的原则，前期建议采用低强度，拉伸等静力性运动运动为主，如快走、瑜伽与有氧健身操等较为柔和的运动来使身体适应减肥的节奏。同时，为了保证在运动过程中，营养摄入充足，可以选一些代餐产品来进行辅助减肥。代餐产品大多集营养均衡、效果显著、食用方便等优点于一身，一般代餐食品具有高纤维、低热量、易有持续饱腹感的特性，持续时间至少应在3小时以上，在减肥过程中加入代餐，可使自己的减肥过程更加营养健康。',
}

const report = ref({})
const isShow = ref(false)
const isShowTip = ref(false)
const tips = ref('')
healthReport().then((res) => {
  if (res.code === 0) {
    report.value = res.data
    isShow.value = true
  } else {
    isShow.value = false
    tips.value = res.msg
  }
})
</script>

<style lang="scss">
.eat-suggestion {
  padding: 20px;
  .item {
    margin-top: 10px;
    display: flex;
    align-items: center;
    .title {
      flex: 1;
      font-size: 14px;
      &::before {
        content: '|';
        font-size: 12px;
        margin-right: 5px;
        color: $primary-color;
        font-weight: bold;
      }
    }
    .result {
      flex: 1;

      font-size: 16px;
      font-weight: bold;
    }
  }

  .box {
    color: #75808a;
    text-align: justify;
    line-height: 1.6;
    font-size: 12px;
  }
}
</style>
