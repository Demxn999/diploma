function registerPageVisit(pageName) {
    let visitedPages = JSON.parse(localStorage.getItem('visitedPages')) || [];
    if (!visitedPages.includes(pageName)) {
        visitedPages.push(pageName);
        localStorage.setItem('visitedPages', JSON.stringify(visitedPages));
    }

    let requiredPages = ['index.html', 'about.html', 'profiles.html', 'games.html', 'design.html', 'design_second.html', 'programming.html', 'programming_second.html', 'quiz.html', 'test.html'];
    let allPagesVisited = requiredPages.every(page => visitedPages.includes(page));

    if (allPagesVisited) {
        localStorage.setItem('achievement_5', 'completed');
    }
}