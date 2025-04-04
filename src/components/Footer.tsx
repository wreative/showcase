import {Zap} from 'lucide-react';

const Footer = ({brandName = "Your Brand"}) => {
    return (
        <footer
            className="mt-auto border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
            <div className="w-full mx-auto px-4 py-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center space-x-2">
                        <Zap className="h-6 w-6 text-primary"/>
                        <span className="text-lg font-semibold text-primary">{brandName}</span>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        © {new Date().getFullYear()} {brandName}. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
