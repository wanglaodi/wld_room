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

class EssaysController extends Controller{
    public  function  actionIndex(){
        $rst = (new Query())
            ->select(['id','name','pic','txt','title','num','tag','day','month','year'])
            ->from('essay')
            ->all();

        echo json_encode($rst);

        exit;
    }
}