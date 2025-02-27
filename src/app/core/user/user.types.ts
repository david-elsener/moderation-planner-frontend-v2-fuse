import { SafeUrl } from '@angular/platform-browser';

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string | SafeUrl;
    status?: string;
}
