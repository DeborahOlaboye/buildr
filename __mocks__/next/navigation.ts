export const useRouter = () => ({
  push: jest.fn(),
});
export const usePathname = () => '/';
export const useSearchParams = () => new URLSearchParams('');
