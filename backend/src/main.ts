import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import axios from "axios";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: "http://localhost:8000" });

  await app.listen(3000);
  //seedDB(20000);
}
bootstrap();

async function seedDB(amount: number = 1) {
  const names =
    "سمير ادريس ناصر فادى فاضل فرح حسن  ناديا اسد احسان امين رائد سلمان حوثى قاسم بلال عطية مريم رايان عدنان عفاف خديجة زهرة ايمن حسين فيصل سعد عبدل فطمة فاطمة احمد محمد على أسراء شهد عمرو عمر عمار صبحى شعبان غازى أمير أسامة ادهم محمود منال الخضرى عبدالله سميح فوزى شكرى يوسف رمزى هانى جرجس مهاب صبرى عباس أبراهيم حمزة".split(
      " ",
    );

  const projectCategorys =
    "كشرى كبدة بطاطس شاورما عيادة مستشفى صيانة لاب تقسيط تيكنولوجيا كومبيو كاميرات زجاج نجارة شاشات ماية زيت تموين تقسيط بنك حديقة شركة".split(
      " ",
    );

  const streets = `شارع الجمهورية
  شارع الأشرف خليل بن قلاوون
  شارع عباس العقاد
  شارع محمد علي
  طريق آل البيت
  قولة
  نصوح باشا
  شارع قصر العيني
  شارع طلعت حرب (سليمان باشا سابقا)
  شارع الفلكي
  شارع محمد محمود
  شارع عبد العزيز
  شارع الشواربي
  شارع رمسيس
  شارع شبرا
  شارع الطيران
  شارع مكرم عبيد
  شارع عبد السلام عارف (شارع البستان شابقا)
  شارع عابدين
  شارع الصنافيري
  شارع عماد الدين`.split("\n");
  function getName(size: number) {
    let bigName = "";
    for (let i = 0; i < size; i++) {
      bigName += names[Math.floor(Math.random() * names.length)] + " ";
    }

    return bigName;
  }

  for (let x = 0; x < amount; x++) {
    const date = randomDate(new Date(2012, 0, 1), new Date());
    const [day, month, year] = date
      .toLocaleDateString("en-GB")
      .replace(/\//g, "-")
      .split("-");

    var config = {
      method: "post",
      url: "http://localhost:3000/create/bill/project",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        name:
          projectCategorys[
            Math.floor(Math.random() * projectCategorys.length)
          ] +
          " " +
          getName(2) +
          makeid(4),
        clientAddress:
          getName(2) +
          streets[Math.floor(Math.random() * streets.length)].trim(),
        clientName: getName(5) + makeid(4),
        date: `${year}-${month}-${day}`,
        officePrecentage: Math.floor(Math.random() * 85),
      },
    };
    await axios(config)
      .then(function (response) {
        console.log(response.data + x);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }
}

function randomDate(start: Date, end: Date) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}

function makeid(length: number) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
