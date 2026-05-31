<?php
// app/Core/Autoloader.php

/**
 * Autoloader PSR-4 Nativo (Não exige Composer)
 * Mapeia namespaces para diretórios
 */
class Autoloader
{
    protected static $prefixes = [];

    /**
     * Registra o autoloader na pilha do SPL.
     */
    public static function register()
    {
        spl_autoload_register([__CLASS__, 'loadClass']);
    }

    /**
     * Adiciona um prefixo de namespace base apontando para um diretório
     */
    public static function addNamespace($prefix, $base_dir)
    {
        $prefix = trim($prefix, '\\') . '\\';
        $base_dir = rtrim($base_dir, DIRECTORY_SEPARATOR) . '/';

        if (!isset(self::$prefixes[$prefix])) {
            self::$prefixes[$prefix] = [];
        }
        array_push(self::$prefixes[$prefix], $base_dir);
    }

    /**
     * Tenta carregar a classe
     */
    public static function loadClass($class)
    {
        $prefix = $class;

        while (false !== $pos = strrpos($prefix, '\\')) {
            $prefix = substr($class, 0, $pos + 1);
            $relative_class = substr($class, $pos + 1);

            if (self::loadMappedFile($prefix, $relative_class)) {
                return $class;
            }

            $prefix = rtrim($prefix, '\\');
        }

        return false;
    }

    protected static function loadMappedFile($prefix, $relative_class)
    {
        if (!isset(self::$prefixes[$prefix])) {
            return false;
        }

        foreach (self::$prefixes[$prefix] as $base_dir) {
            $file = $base_dir . str_replace('\\', '/', $relative_class) . '.php';

            if (self::requireFile($file)) {
                return $file;
            }
        }
        return false;
    }

    protected static function requireFile($file)
    {
        if (file_exists($file)) {
            require_once $file;
            return true;
        }
        return false;
    }
}

// Inicializa automaticamente para as pastas do Backend
Autoloader::register();
Autoloader::addNamespace('Models', __DIR__ . '/../Models');
Autoloader::addNamespace('Core', __DIR__ . '/../Core');

?>

Autoloader::addNamespace('', __DIR__ . '/');

