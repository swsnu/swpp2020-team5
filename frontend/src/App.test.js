
  it('should create Logout and ArticleCreate at /articles/create', () => {
    const mockStore = getMockStore({});
    history.push('/articles/create/')
    let app = (
      <Provider store={mockStore}>
        <App history={history} />
      </Provider>
    );
    const component = mount(app);
    expect(component.find('.spyArticleCreate').length).toBe(1)
    expect(component.find('.spyLogout').length).toBe(1)
  });

  it('should create Logout and Detail at /articles/:id', () => {
