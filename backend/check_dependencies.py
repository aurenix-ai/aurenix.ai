import sys
import socket
import importlib
from typing import List, Tuple

def check_module(module_name: str) -> Tuple[bool, str]:
    try:
        importlib.import_module(module_name)
        return True, f"✓ {module_name} is installed"
    except ImportError:
        return False, f"✗ {module_name} is not installed"

def check_service(host: str, port: int, name: str) -> Tuple[bool, str]:
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    try:
        result = sock.connect_ex((host, port))
        sock.close()
        if result == 0:
            return True, f"✓ {name} is running on {host}:{port}"
        return False, f"✗ {name} is not running on {host}:{port}"
    except:
        sock.close()
        return False, f"✗ Could not check {name} on {host}:{port}"

def main():
    print("Checking Aurenix AI Backend Dependencies...")
    print("\nPython Packages:")
    
    required_modules = [
        "fastapi",
        "uvicorn",
        "motor",
        "redis",
        "celery",
        "pydantic",
        "python-jose",
        "passlib",
        "python-multipart",
        "email-validator",
        "openai"
    ]
    
    all_modules_installed = True
    for module in required_modules:
        success, message = check_module(module)
        print(message)
        if not success:
            all_modules_installed = False
    
    print("\nServices:")
    services_running = True
    
    # Check MongoDB
    success, message = check_service("localhost", 27017, "MongoDB")
    print(message)
    if not success:
        services_running = False
    
    # Check Redis
    success, message = check_service("localhost", 6379, "Redis")
    print(message)
    if not success:
        services_running = False
    
    print("\nStatus:")
    if all_modules_installed and services_running:
        print("✓ All dependencies are satisfied")
        return 0
    else:
        print("✗ Some dependencies are missing")
        return 1

if __name__ == "__main__":
    sys.exit(main())
