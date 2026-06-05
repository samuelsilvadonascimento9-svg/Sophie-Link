<?php
$_SERVER['REQUEST_METHOD'] = 'POST';
$json = json_encode(['id' => 1]);
// Mock file_get_contents('php://input') for the script
$tmpHandle = fopen('php://temp', 'w+');
fwrite($tmpHandle, $json);
rewind($tmpHandle);
$originalStream = stream_wrapper_unregister('php');
stream_wrapper_register('php', 'MockPhpStream');

class MockPhpStream {
    public $context;
    private $position = 0;
    private $data = '{"id":1}';
    
    public function stream_open($path, $mode, $options, &$opened_path) { return true; }
    public function stream_read($count) {
        $ret = substr($this->data, $this->position, $count);
        $this->position += strlen($ret);
        return $ret;
    }
    public function stream_eof() { return $this->position >= strlen($this->data); }
    public function stream_stat() { return []; }
}

require 'public/api/pagamentos/checkout_mp.php';
