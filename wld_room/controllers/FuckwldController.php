<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2016/8/10
 * Time: 9:33
 */
namespace app\controllers;

use yii\web\controller;

class FuckwldController extends Controller{



    /**
     * php进阶学习
     */
    public function actionRun(){

        /**
         * cookie设置和session设置
         * 分别用全局变量$_cookie和$_session获取
         * cookie (name,val,过期时间,路径,域名)
         * session
         */


        //利用session存储用户信息
        session_start();

        $userinfo = array
        (
            'name' => 'di',
            'sex'  => 'man',
            'age'  => 22,
            'uid'  => 10000,
            'email'=> '1214528022@qq.com'
        );
        header('content-type"text/html','charset=utf-8');

        //设置session属性
        $_SESSION['name'] = $userinfo['name'];
        $_SESSION['uid']  = $userinfo['uid'];
        $_SESSION['userinfo'] = $userinfo;


        //加密密钥
        $secureKEY = 'abc';
        $str = serialize($userinfo);

        //加密
        $str = base64_encode(mcrypt_encrypt(MCRYPT_RIJNDAEL_256,md5($secureKEY),$str,MCRYPT_MODE_ECB));

        setcookie('userinfo',$str);

//        echo  $_COOKIE['userinfo'];

        $str = mcrypt_decrypt(MCRYPT_RIJNDAEL_256,md5($secureKEY),base64_decode($str),MCRYPT_MODE_ECB);

        var_dump(unserialize($str));

        exit;



        //设置session
        session_start();
        $_SESSION['time'] = date('y-m-d',time());

        echo 'session_id:'.session_id();
        echo '<br/>';

        unset($_SESSION['time']);

        echo $_SESSION['time'];

        exit;

        //设置cookie
        setcookie('time',time()+1);
        setcookie('time','',time()-1);

        if(isset($_COOKIE['time']))
        {
            echo '存在';
        }
        else
        {
            echo '不存在';
        }

        exit;








        $url='http://g.hiphotos.baidu.com/zhidao/pic/item/4034970a304e251f3ba0d299a186c9177f3e537f.jpg';
        $content=file_get_contents($url);
        $filename='love.jpeg';
        file_put_contents($filename,$content);
        $url='http://img4.duitang.com/uploads/item/201408/19/20140819153606_cNwZv.jpeg';
        file_put_contents('logo.jpeg',file_get_contents($url));


        $img=imagecreatefromjpeg($filename);
        $logo=imagecreatefromjpeg('logo.jpeg');
        $size=getimagesize('logo.jpeg');
        imagecopy($img, $logo, 0, 0, 30, 30, $size[0], $size[1]);


        header("content-type:image/jpeg");
        imagejpeg($img);
        exit;



        /**
         * PHP  GD图形构建
         * imagecreatetruecolor 创建背景
         * imagecolorallocate 创建画笔
         * imageline 画线
         * imagestring 写文字
         * imagepng可以将图像保存成png格式   imagejpeg保存时还有质量参数
         * imagesetpixel绘制一个点通常用来实现噪点干扰
         */

        $img = imagecreatetruecolor(100,20);
        $rad = imagecolorallocate($img,0xff,0xff,0xff);
        $greed = imagecolorallocate($img,0x00,0xff,0x00);
        $white = imagecolorallocate($img,0x00,0x00,0x00);
        $red = imagecolorallocate($img,0xff,0x00,0x00);

        imagefill($img,0,0,$white);

        //随机生成一个验证码
        $code = '';
        for($i = 0; $i < 4; $i++)
        {
            $code .= rand(0,9);
        }
        imagestring($img,5,25,0,$code,$rad);

        //生成随机的点干扰验证码
        for($i = 0; $i<50; $i++)
        {
            imagesetpixel($img,rand(0,100),rand(0,20),$greed);
            imagesetpixel($img,rand(0,100),rand(0,20),$red);
        }


//        imageline($img,0,0,100,100,$rad);

//        imagestring($img,10,10,10,'hello world',$rad);

        header("content-type: image/png");
        imagepng($img);
        imagedestroy($img);

        exit;


        /**
         * 内置函数strtotime实现功能：获取某个日期的时间戳，或获取某个时间的时间戳
         */
        echo date('y-m-d',strtotime('2016-09-23'));
        exit;



        /**
         * 获取UNIX时间戳 time() 表从1970年到现在过看多少秒
         */
        echo date('y-m-d h:i:s',time());
        exit;



        $filename = 'E:/yanz.txt';

        /**
         * filesize 获得文件的大小
         */

        echo filesize($filename);

        exit;


        /**
         *  fileowner：获得文件的所有者
         *  filectime：获取文件的创建时间
         *  filemtime：获取文件的修改时间
         *  fileatime：获取文件的访问时间
         */

        echo '文件的所有者是：'.fileowner($filename).'<br/>';
        echo '文件的创建时间是：'.date('Y-m-d H:i:s',filectime($filename)).'<br/>';
        echo '文件的修改时间是：'.date('Y-m-d H:i:s',filemtime($filename)).'<br/>';
        echo '文件的访问时间是：'.date('Y-m-d H:i:s',fileatime($filename)).'<br/>';


        exit;



        //is_readable与is_writeable在文件是否存在的基础上，判断文件是否可读与可写.
        if(is_writable($filename)){
           file_put_contents($filename,'这是一个文本');
        }
        if(is_readable($filename)){
            echo file_get_contents($filename);
        }

        exit;


        //file_exists不仅可以判断文件是否存在，同时也可以判断目录是否存在
        if(file_exists($filename)){
            echo file_get_contents($filename);
        }

        print ("<br/>");

        //is_file是确切的判断给定的路径是否是一个文件
        if(is_file($filename)){
            echo file_get_contents($filename);
        }





    }
}