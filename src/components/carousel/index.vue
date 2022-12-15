<template>
  <el-carousel :interval="4000" type="card" height="280px" class="carouselBody">
    <el-carousel-item v-for="item in imgs" :key="item.index">
      <img :src="item.img"/>
    </el-carousel-item>
  </el-carousel>
</template>

<<script>
//导入图片
import carousel1 from '@/assets/img/carousel1.jpg'
import carousel2 from '@/assets/img/carousel2.jpg'
import carousel3 from '@/assets/img/carousel3.jpg'
import carousel4 from '@/assets/img/carousel4.jpg'
import carousel5 from '@/assets/img/carousel5.jpg'
import carousel6 from '@/assets/img/carousel6.jpg'
export default {
  data() {
    return {
      imgs: [
        {
          index: 1,
          img: carousel1
        },
        {
          index: 2,
          img: carousel2
        },
        {
          index: 3,
          img: carousel3
        },
        {
          index: 4,
          img: carousel4
        },
        {
          index: 5,
          img: carousel5
        },
        {
          index: 6,
          img: carousel6
        }
      ]
    };
  }
}
</script>
<style>
.carouselBody{
  margin-top: 20px;
}
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  img{
    object-fit: fill;
    width: 100%;
    height: 100%;
  }
</style>