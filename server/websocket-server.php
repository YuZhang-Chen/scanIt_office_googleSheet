<?php
require __DIR__ . '/vendor/autoload.php';

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;

// 定義 WebSocket 伺服器類別，實現 MessageComponentInterface 介面
class SocketServer implements MessageComponentInterface {
    protected $clients;

    // 建構函數，初始化客戶端集合
    public function __construct() {
        $this->clients = new \SplObjectStorage;
    }

    // 當有新連接時觸發
    public function onOpen(ConnectionInterface $conn) {
        // 將新連接加入客戶端集合
        $this->clients->attach($conn);
        echo "New connection! ({$conn->resourceId})\n";
    }

    // 當收到訊息時觸發
    public function onMessage(ConnectionInterface $from, $msg) {
        echo "Message: {$msg}\n";
        // 廣播訊息給所有連接的客戶端
        foreach ($this->clients as $client) {
            if ($from !== $client) {
                $client->send($msg);
            }
        }
    }


    public function onClose(ConnectionInterface $conn) {
        // 從客戶端集合中移除連接
        $this->clients->detach($conn);
        echo "Connection {$conn->resourceId} has disconnected\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        echo "An error has occurred: {$e->getMessage()}\n";
        $conn->close();
    }
}

// 啟動 WebSocket
$server = IoServer::factory(
    new HttpServer(
        new WsServer(
            new SocketServer()
        )
    ),
    8080
);

echo "WebSocket server started on port 8080\n";
$server->run();