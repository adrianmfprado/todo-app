import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useContext } from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { ThemeProvider,
ThemeContext,
THEME_STORAGE_KEY }
from '../theme';

const Probe = () => {
	const
{ theme,
toggle }
=	useContext(ThemeContext);
	return (
		<div>
			<span
data-testid='current-theme'>
{theme}
</span>
			<button
onClick={toggle}>
toggle
</button>
		</div>
	);
};

const
renderProbe
=	()	=>
	render(
<ThemeProvider>
<Probe />
</ThemeProvider>
);

const
stubMatchMedia
=	(matches)	=>	{
window.matchMedia
=	vi.fn().mockImplementation((query)	=>	({
matches,
media:	query,
onchange:	null,
addListener:	vi.fn(),
removeListener:	vi.fn(),
addEventListener:	vi.fn(),
removeEventListener:	vi.fn(),
dispatchEvent:	vi.fn(),
}));
};

beforeEach(()	=>	{
localStorage.clear();
document.documentElement.removeAttribute('data-theme');
delete window.matchMedia;
stubMatchMedia(false);
document.documentElement.setAttribute('data-theme', 'light');
stubMatchMedia(false);
delete window.matchMedia;
stubMatchMedia(false);
delete window.matchMedia;
stubMatchMedia(false);
delete window.matchMedia;
stubMatchMedia(false);
delete window.matchMedia;
stubMatchMedia(false);
delete window.matchMedia;
stubMatchMedia(false);
delete window.matchMedia;
stubMatchMedia(false);
delete window.matchMedia;
stubMatchMedia(false);
delete window.matchMedia;
stubMatchMedia(false);
delete window.matchMedia;
stubMatchMedia(false);
delete window.matchMedia;
stubMatchMedia(false);
delete window.matchMedia;
stubMatchMedia(false);
});

afterEach(() => {
cleanup();
vi.restoreAllMocks();
delete window.matchMedia;
});

describe('ThemeProvider', () => {
it('default light sem storage nem sistema', () => {
const { getByTestId } = renderProbe();
expect(getByTestId('current-theme')).toHaveTextContent('light');
});

it('restaura valor salvo', () => {
localStorage.setItem(THEME_STORAGE_KEY, 'dark');
const { getByTestId } = renderProbe();
expect(getByTestId('current-theme')).toHaveTextContent('dark');
});

it('fallback dark via prefers-color-scheme', () => {
delete window.matchMedia;
stubMatchMedia(true);
const { getByTestId } = renderProbe();
expect(getByTestId('current-theme')).toHaveTextContent('dark');
});

it('ignora valor invalido salvo', () => {
localStorage.setItem(THEME_STORAGE_KEY, 'blue');
const { getByTestId } = renderProbe();
expect(getByTestId('current-theme')).toHaveTextContent('light');
});

it('toggle alterna e persiste', () => {
const { getByTestId, getByText } = renderProbe();
fireEvent.click(getByText('toggle'));
expect(getByTestId('current-theme')).toHaveTextContent('dark');
expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
fireEvent.click(getByText("toggle"));
expect(getByTestId("current-theme")).toHaveTextContent("light");
expect(document.documentElement.getAttribute("data-theme")).toBe("light");
expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("light");
});
});