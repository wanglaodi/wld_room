<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/8/10
 * Time: 9:33
 */
namespace app\controllers;

use yii\web\controller;
use yii\db\Query;

class GettxtController extends Controller{
    public function actionIndex(){
        $request = \yii::$app->request;

        $id = $request->post('id');

        $rst = (new Query())
            ->select(['id','name','pic','txt','title','num','tag','day','month','year'])
            ->from('essay')
            ->where('id=:id',[':id' => $id])
            ->one();

        echo json_encode($rst);
    }
}