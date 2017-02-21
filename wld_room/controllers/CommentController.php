<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/9/14
 * Time: 10:07
 */
namespace app\controllers;

use Yii;
use yii\web\Controller;
use yii\db\Query;

class CommentController extends Controller{
    public function actionRun()
    {
        //设置请求组件
        $request = \yii::$app->request;
        //获取到请求的name值
        $id =  $request->post('comment_id');
        $pic = 'http://imgcache.qq.com/mediastyle/y/img/cover_qzone_100.jpg';
        $name = $request->post('comment_name');
        $time = date('y-m-d h:i:s');
        $txt = $request->post('comment_txt');

        $sql = 'INSERT INTO comment(id, user_name, pic, time, txt) VALUES (:id,:user_name,:pic, :times, :txt)';

        \yii::$app->db->createCommand($sql,[
            ':id' => $id ,
            ':user_name' => $name,
            ':pic' => $pic,
            ':times' => $time,
            ':txt' => $txt
        ])->execute();

        exit;
    }


    public function actionGet()
    {
        $request = \yii::$app->request;

        $id =  $request->post('id');

        $user = (new Query())
            ->select(['txt','user_name','id as cid','time','pic','record_id'])
            ->from('comment')
            ->where('id=:id',[':id' => $id])
            ->all();


        foreach($user as $test){
            $id = $test['record_id'];
            //添加二级用户评论
            $user_after = (new Query())
                ->select(['cf.txt','cf.user_name','cf.id as cid','cf.time','cf.pic','to_user_name'])
                ->from('comment_friend cf')
                ->innerJoin('comment cb','cb.record_id = cf.id')
                ->where('cf.id = :id',[':id' => $id])
                ->all();

            $s = array_search($test,$user);
            $test['user_after'] = $user_after;
            $user[$s] = $test;
        }
        echo json_encode($user);

        exit;
    }

    public function actionAfter()
    {
        $request = \yii::$app->request;

        $id =  $request->post('comment_id');
        $pic = 'images/4.jpg';
        $name = $request->post('user_name');
        $to_user_name = $request->post('to_user_name');
        $time = date('y-m-d h:i:s');
        $txt = $request->post('comment_txt');


        $sql = 'INSERT INTO comment_friend(id, user_name, to_user_name, pic, time, txt) VALUES (:id, :user_name, :to_user_name, :pic, :times, :txt)';

        \yii::$app->db->createCommand($sql,[
            ':id' => $id ,
            ':user_name' => $name,
            'to_user_name' => $to_user_name,
            ':pic' => $pic,
            ':times' => $time,
            ':txt' => $txt
        ])->execute();

        exit;
    }

}