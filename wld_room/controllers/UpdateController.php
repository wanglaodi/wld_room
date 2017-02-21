<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/8/8
 * Time: 17:45
 */
namespace app\controllers;

use Yii;
use yii\web\Controller;
use yii\db\Query;

class UpdateController extends Controller{
    //更新文章内容
    public function actionEssay()
    {
        //设置响应头，为了拿到POST数据
        $request = \yii::$app->request;
        $id = $request->post(id);

        $res = (new Query())
            ->select(['id','name','pic','txt','title','num','tag','day','month','year'])
            ->from('essay')
            ->where('id=:id',[':id' => $id])
            ->one();

        echo json_encode($res);
    }

    //更新右侧文章
    public function actionLearn()
    {
        //设置响应头，为了拿到POST数据
        $request = \yii::$app->request;
        $id = $request->post(id);

        $res = (new Query())
            ->select(['id','address', 'experience', 'functions'])
            ->from('learn')
            ->where('id=:id',[':id' => $id])
            ->one();

        echo json_encode($res);
    }

    //添加录入信息
    public function actionEssaynew()
    {
        //设置请求组件
        $request = \yii::$app->request;
        //获取到请求的name值
        $pic =  $request->post('movie_pic');
        $name = $request->post('movie_name');
        $year = $request->post('movie_year');
        $month = $request->post('movie_month');
        $txt = $request->post('movie_txt');
        $day = $request->post('movie_day');
        $title = $request->post('movie_title');
        $tag = $request->post('movie_tag');
        $num = $request->post('movie_num');


        $sql = 'INSERT INTO essay(name, num, pic, tag, year, month, day, title, txt) VALUES (:name1,:num,:pic, :tag, :year1, :month1, :day1, :title, :txt)';
        \Yii::$app->db->createCommand($sql,[
            ':name1' => $name,
            ':num' => $num,
            ':pic' => $pic,
            ':tag' => $tag,
            ':year1' => $year,
            ':month1' => $month,
            ':day1' => $day,
            ':title' => $title,
            ':txt' => $txt
        ])->execute();

        $this->redirect('http://wanglaodi.com/src/html/#slide-main/',302);
    }

    //添加录入信息
    public function actionLearnnew()
    {
         //设置请求组件
        $request = \yii::$app->request;
        //获取到请求的name值
        $title =  $request->post('movie_title');
        $functions =  $request->post('movie_functions');
        $experience =  $request->post('movie_experience');
        $address =  $request->post('movie_address');

        $sql = 'INSERT INTO learn(address, experience, functions, title) VALUES (:address,:experience,:functions, :title)';
        \Yii::$app->db->createCommand($sql,[
            ':address' => $address,
            ':experience' => $experience,
            ':functions' => $functions,
            ':title' => $title,
        ])->execute();

        $this->redirect('http://wanglaodi.com/src/html/#slide-main/',302);
    }
}