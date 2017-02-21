<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/8/1
 * Time: 16:13
 */
namespace app\models;

class Tests extends \yii\db\ActiveRecord{
    public static function tableName(){
        return 'tests';
    }
    //创建场景
    public function scenarios(){
        return [
            'scenarios1' => ['id','title'],
            'scenarios2' => ['id']
        ];
    }
}