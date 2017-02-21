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

class LearnController extends Controller{
    public function actionRun()
    {

        $rst = (new Query())
            ->select(['id','address', 'experience', 'functions', 'title'])
            ->from('learn')
            ->all();

        echo json_encode($rst);


        exit;
    }
}