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

class DeleteController extends Controller{
    public function actionEssay()
    {

        $request = \yii::$app->request;
        $id = $request->post('id');

        $sql = 'delete from essay where id=:id';
        \yii::$app->db->createCommand($sql,[':id' => $id])->execute();

        exit;
    }
    public function actionLearn()
    {
        $request = \yii::$app->request;
        $id = $request->post('id');

        $sql = 'delete from learn where id=:id';
        \yii::$app->db->createCommand($sql,[':id' => $id])->execute();

        exit;
    }
    public function actionUser()
    {

        $request = \yii::$app->request;
        $id = $request->post('id');

        $sql = 'delete from user where id=:id';
        \yii::$app->db->createCommand($sql,[':id' => $id])->execute();

        exit;
    }
}