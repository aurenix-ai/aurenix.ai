import uvicorn
from pathlib import Path
import os

def main():
    # Set the working directory to the backend directory
    backend_dir = Path(__file__).parent.absolute()
    os.chdir(backend_dir)
    
    # Add the current directory to PYTHONPATH
    import sys
    sys.path.append(str(backend_dir))
    
    # Run the server
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )

if __name__ == "__main__":
    main()
