<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/8/9
 * Time: 10:37
 */
namespace app\controllers;

use yii\web\controller;
use yii\db\Query;

class  UserController extends controller{

    public function actionIndex(){
        //设置session组件
        $session = \yii::$app->session;
        //启动session
        $session->open();
        //获取session信息
        echo $session->get('user');
    }

    //设置用户的登录
    public function actionSignin(){
        //设置请求组件
        $request = \yii::$app->request;
        //获取到请求的name值
        $name =  $request->post('name');
        $password = $request->post('password');


        $rst = (new Query())
            ->select(['id','name','password','role'])
            ->from('user')
            ->where('name=:una and password=:pad',[':una'=>$name,':pad'=>$password])
            ->one();

        $rsts = (new Query())
            ->select(['id','name','password','role'])
            ->from('user')
            ->where('name=:una',[':una'=>$name])
            ->one();

        if($rst){

            //设置session组件
            $session = \yii::$app->session;
            //启动session
            $session->open();
            //设置session信息(以对象的方式)
            $session->set('user',$name);
            echo 1;
            exit;
        }else{
            if($rsts){
                echo 2;
                exit;
            }else {
                echo 0;
                exit;
            }
        };
        exit;
    }

    //设置用户的注册
    public function actionSignup(){

        //设置请求组件
        $request = \yii::$app->request;
        //获取到请求的name值
        $name =  $request->post('name');
        $password = $request->post('password');

        $rst = (new Query())
            ->select(['id','name','password','role'])
            ->from('user')
            ->where('name=:una',[':una'=>$name])
            ->one();

        if($rst){
            echo 0;
            exit;
        }else{
            $sql = 'INSERT INTO user(name, password, role) VALUES (:name1,:password1,10)';
            \Yii::$app->db->createCommand($sql,[
                ':name1' => $name,
                ':password1' => $password
            ])->execute();
            echo 1;
            exit;
        };

        exit;
    }

    //用户的登出
    public function actionLogot (){
        //设置session组件
        $session = \yii::$app->session;
        //删除session
        $session->remove('user');
        $this->redirect($_SERVER['HTTP_REFERER'],302);
    }

    //用户列表查询
    public function actionUserlist(){
        $rst = (new Query())
            ->select(['id','name','password','role'])
            ->from('user')
            ->all();
        echo json_encode($rst);
    }

    public function actionRole(){
        //获得post数据
        $request = \yii::$app->request;
        $name = $request->post('name');
        $rst = (new Query())
            ->select(['role'])
            ->from('user')
            ->where('name=:una',[':una'=>$name])
            ->one();
        echo json_encode($rst);
    }
}