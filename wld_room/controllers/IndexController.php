<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/8/1
 * Time: 16:25
 */
namespace app\controllers;

use yii\web\controller;
use app\models\Tests;

class IndexController extends controller{
    public function  actionIndex(){
        $tests = new tests;
        $testsData = [
            'data' => ['id' => 3,'title' => 'hello world']
        ];
        $tests ->load($testsData,'data');
        echo $tests -> id;
        echo $tests -> title;
    }
}