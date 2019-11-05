import NativePromise from 'native-promise-only';
import _ from 'lodash';
import Webform from './Webform';
import Base from './components/base/Base';
import Formio from './Formio';
<<<<<<< HEAD
import {
  checkCondition,
  hasCondition,
  firstNonNil
} from './utils/utils';
=======
import { checkCondition, firstNonNil } from './utils/utils';
>>>>>>> upstream/master

export default class Wizard extends Webform {
  /**
   * Constructor for wizard based forms
   * @param element Dom element to place this wizard.
   * @param {Object} options Options object, supported options are:
   *    - breadcrumbSettings.clickable: true (default) determines if the breadcrumb bar is clickable or not
   *    - buttonSettings.show*(Previous, Next, Cancel): true (default) determines if the button is shown or not
   */
  constructor() {
    let element, options;
    if (arguments[0] instanceof HTMLElement || arguments[1]) {
      element = arguments[0];
      options = arguments[1];
    }
    else {
      options = arguments[0];
    }
    super(element, options);
    this.pages = [];
    this.globalComponents = [];
    this.components = [];
    this.page = 0;
<<<<<<< HEAD
    this._nextPage = 0;
=======
    this.currentNextPage = 0;
>>>>>>> upstream/master
    this._seenPages = [0];
  }

  isLastPage() {
<<<<<<< HEAD
    const next = this.getNextPage(this.submission.data, this.page);
=======
    const next = this.getNextPage();
>>>>>>> upstream/master

    if (_.isNumber(next)) {
      return 0 < next && next >= this.pages.length;
    }

    return _.isNull(next);
  }

  getPages(args = {}) {
    const { all = false } = args;
<<<<<<< HEAD
    const pageOptions = _.clone(this.options);
    const components = _.clone(this.components);
    const pages = this.pages
          .filter(all ? _.identity : (p, index) => this._seenPages.includes(index))
          .map((page, index) => this.createComponent(
            page,
            _.assign(pageOptions, { components: index === this.page ? components : null })
          ));

    this.components = components;
=======
    const pages = this.pages
          .filter(all ? _.identity : (p, index) => this._seenPages.includes(index));
>>>>>>> upstream/master

    return pages;
  }

  getComponents() {
    return this.submitting
      ? this.getPages({ all: this.isLastPage() })
      : super.getComponents();
  }

  resetValue() {
    this.getPages({ all: true }).forEach((page) => page.resetValue());
    this.setPristine(true);
  }

  init() {
    // Check for and initlize button settings object
    this.options.buttonSettings = _.defaults(this.options.buttonSettings, {
      showPrevious: true,
      showNext: true,
      showSubmit: true,
      showCancel: !this.options.readOnly
    });

    this.options.breadcrumbSettings = _.defaults(this.options.breadcrumbSettings, {
      clickable: true
    });

    this.page = 0;
    return super.init();
  }

  get wizardKey() {
    return `wizard-${this.key}`;
  }

  get form() {
    return this.wizard;
  }

  set form(value) {
    super.form = value;
  }

  get buttons() {
    const buttons = {};
    [
      { name: 'cancel',    method: 'cancel' },
      { name: 'previous',  method: 'prevPage' },
      { name: 'next',      method: 'nextPage' },
      { name: 'submit',    method: 'submit' }
    ].forEach((button) => {
      if (this.hasButton(button.name)) {
        buttons[button.name] = button;
      }
    });
    return buttons;
  }

  get renderContext() {
    return {
      wizardKey: this.wizardKey,
      panels: this.pages.map(page => page.component),
      buttons: this.buttons,
      currentPage: this.page,
    };
  }

  render() {
    const ctx = this.renderContext;
    return this.renderTemplate('wizard', {
      ...ctx,
      wizardHeader: this.renderTemplate('wizardHeader', ctx),
      wizardNav: this.renderTemplate('wizardNav', ctx),
      components: this.renderComponents([...this.globalComponents, ...this.currentPage.components]),
    }, this.builderMode ? 'builder' : 'form');
  }

  redrawNavigation() {
    if (this.element) {
      let navElement = this.element.querySelector(`#${this.wizardKey}-nav`);
      if (navElement) {
        this.detachNav();
        navElement.outerHTML = this.renderTemplate('wizardNav', this.renderContext);
        navElement = this.element.querySelector(`#${this.wizardKey}-nav`);
        this.loadRefs(navElement, {
          [`${this.wizardKey}-cancel`]: 'single',
          [`${this.wizardKey}-previous`]: 'single',
          [`${this.wizardKey}-next`]: 'single',
          [`${this.wizardKey}-submit`]: 'single',
        });
        this.attachNav();
      }
    }
  }

  redrawHeader() {
    if (this.element) {
      let headerElement = this.element.querySelector(`#${this.wizardKey}-header`);
      if (headerElement) {
        this.detachHeader();
        headerElement.outerHTML = this.renderTemplate('wizardHeader', this.renderContext);
        headerElement = this.element.querySelector(`#${this.wizardKey}-header`);
        this.loadRefs(headerElement, {
          [`${this.wizardKey}-link`]: 'multiple'
        });
        this.attachHeader();
      }
    }
  }

  attach(element) {
    this.element = element;
    this.loadRefs(element, {
      [this.wizardKey]: 'single',
      [`${this.wizardKey}-cancel`]: 'single',
      [`${this.wizardKey}-previous`]: 'single',
      [`${this.wizardKey}-next`]: 'single',
      [`${this.wizardKey}-submit`]: 'single',
      [`${this.wizardKey}-link`]: 'multiple',
    });

    const promises = this.attachComponents(this.refs[this.wizardKey], [...this.globalComponents, ...this.currentPage.components]);
    this.attachNav();
    this.attachHeader();
    return promises;
  }

  attachNav() {
    const isClickable = _.get(this.options, 'breadcrumbSettings.clickable', true);
    if (isClickable) {
      _.each(this.buttons, (button) => {
        const buttonElement = this.refs[`${this.wizardKey}-${button.name}`];
        this.addEventListener(buttonElement, 'click', (event) => {
          event.preventDefault();

          // Disable the button until done.
          buttonElement.setAttribute('disabled', 'disabled');
          this.setLoading(buttonElement, true);

          // Call the button method, then re-enable the button.
          this[button.method]().then(() => {
            buttonElement.removeAttribute('disabled');
            this.setLoading(buttonElement, false);
          }).catch(() => {
            buttonElement.removeAttribute('disabled');
            this.setLoading(buttonElement, false);
          });
        });
      });
    }
  }

  attachHeader() {
    this.refs[`${this.wizardKey}-link`].forEach((link, index) => {
      this.addEventListener(link, 'click', (event) => {
        this.emit('wizardNavigationClicked', this.pages[index]);
        event.preventDefault();
        this.setPage(index);
      });
    });
  }

  detachNav() {
    _.each(this.buttons, (button) => {
      this.removeEventListener(this.refs[`${this.wizardKey}-${button.name}`], 'click');
    });
  }

  detachHeader() {
    this.refs[`${this.wizardKey}-link`].forEach((link) => {
      this.removeEventListener(link, 'click');
    });
  }

  establishPages() {
    this.pages = [];
    const visible = [];
    const currentPages = {};
    if (this.components && this.components.length) {
      this.components.map(page => {
        if (page.component.type === 'panel') {
          currentPages[page.component.key || page.component.title] = page;
        }
      });
    }
    _.each(this.originalComponents, (item) => {
      const pageOptions = _.clone(this.options);
      if (item.type === 'panel') {
        if (!item.key) {
          item.key = item.title;
        }
        let page = currentPages[item.key];
        const isVisible = checkCondition(item, this.data, this.data, this.component, this);
        if (isVisible) {
          visible.push(item);
          if (page) {
            this.pages.push(page);
          }
        }
        if (!page && isVisible) {
          page = this.createComponent(item, pageOptions);
          this.pages.push(page);
          page.eachComponent((component) => {
            component.page = this.page;
          });
        }
        else if (page && !isVisible) {
          this.removeComponent(page);
        }
      }
      else if (item.type === 'hidden') {
        const component = this.createComponent(item, pageOptions);
        this.globalComponents.push(component);
      }
    });
    return visible;
  }

  addComponents() {
    this.establishPages();
  }

  setPage(num) {
    if (num === this.page) {
      return NativePromise.resolve();
    }
    if (!this.wizard.full && num >= 0 && num < this.pages.length) {
      this.page = num;
<<<<<<< HEAD
      if (!this._seenPages.includes(num)) {
        this._seenPages = this._seenPages.concat(num);
      }
      return super.setForm(this.currentPage());
    }
    else if (this.wizard.full || !this.pages.length) {
      return super.setForm(this.getWizard());
=======

      this.pageFieldLogic(num);

      this.getNextPage();
      if (!this._seenPages.includes(num)) {
        this._seenPages = this._seenPages.concat(num);
      }
      this.redraw();
      return NativePromise.resolve();
    }
    else if (this.wizard.full || !this.pages.length) {
      this.redraw();
      return NativePromise.resolve();
>>>>>>> upstream/master
    }
    return NativePromise.reject('Page not found');
  }

  pageFieldLogic(page) {
    // Handle field logic on pages.
    this.component = this.pages[page].component;
    this.originalComponent = _.cloneDeep(this.component);
    this.fieldLogic(this.data);
    // If disabled changed, be sure to distribute the setting.
    this.disabled = this.shouldDisabled;
  }

  get currentPage() {
    return (this.pages && (this.pages.length >= this.page)) ? this.pages[this.page] : { components: [] };
  }

  getNextPage() {
    const data = this.submission.data;
    const form = this.pages[this.page].component;
    // Check conditional nextPage
    if (form) {
      const page = this.page + 1;
      if (form.nextPage) {
        const next = this.evaluate(form.nextPage, {
          next: page,
          data,
          page,
          form
        }, 'next');
        if (next === null) {
          this.currentNextPage = null;
          return null;
        }

        const pageNum = parseInt(next, 10);
        if (!isNaN(parseInt(pageNum, 10)) && isFinite(pageNum)) {
          this.currentNextPage = pageNum;
          return pageNum;
        }

        this.currentNextPage = this.getPageIndexByKey(next);
        return this.currentNextPage;
      }

      this.currentNextPage = page;
      return page;
    }

    this.currentNextPage = null;
    return null;
  }

  getPreviousPage() {
    return Math.max(this.page - 1, 0);
  }

  beforeSubmit() {
<<<<<<< HEAD
    return Promise.all(this.getPages().map((page) => {
      page.options.beforeSubmit = true;
      return page.beforeSubmit();
    }));
=======
    return NativePromise.all(this.getPages().map((page) => {
      page.options.beforeSubmit = true;
      return page.beforeSubmit();
    }));
  }

  beforePage(next) {
    return new NativePromise((resolve, reject) => {
      this.hook(next ? 'beforeNext' : 'beforePrev', this.currentPage, this.submission, (err) => {
        if (err) {
          this.showErrors(err, true);
          reject(err);
        }

        const form = this.currentPage;
        if (form) {
          form.beforePage(next).then(resolve).catch(reject);
        }
        else {
          resolve();
        }
      });
    });
>>>>>>> upstream/master
  }

  nextPage() {
    // Read-only forms should not worry about validation before going to next page, nor should they submit.
    if (this.options.readOnly) {
<<<<<<< HEAD
      return this.setPage(this.getNextPage(this.submission.data, this.page)).then(() => {
        this._nextPage = this.getNextPage(this.submission.data, this.page);
=======
      return this.setPage(this.getNextPage()).then(() => {
>>>>>>> upstream/master
        this.emit('nextPage', { page: this.page, submission: this.submission });
      });
    }

<<<<<<< HEAD
    // Validate the form builed, before go to the next page
    if (this.checkCurrentPageValidity(this.submission.data, true)) {
      this.checkData(this.submission.data, {
        noValidate: true
      });
      return this.beforeNext().then(() => {
        return this.setPage(this.getNextPage(this.submission.data, this.page)).then(() => {
          this._nextPage = this.getNextPage(this.submission.data, this.page);
=======
    // Validate the form, before go to the next page
    if (this.checkValidity(this.submission.data, true, true)) {
      this.checkData(this.submission.data);
      return this.beforePage(true).then(() => {
        return this.setPage(this.getNextPage()).then(() => {
>>>>>>> upstream/master
          this.emit('nextPage', { page: this.page, submission: this.submission });
        });
      });
    }
    else {
      return NativePromise.reject(this.showErrors(null, true));
    }
  }

  prevPage() {
    return this.beforePage().then(() => {
      return this.setPage(this.getPreviousPage()).then(() => {
        this.emit('prevPage', { page: this.page, submission: this.submission });
      });
    });
  }

  cancel(noconfirm) {
    if (super.cancel(noconfirm)) {
      return this.setPage(0);
    }
    else {
      return this.setPage();
    }
  }

  getPageIndexByKey(key) {
<<<<<<< HEAD
    let pageIndex = 0;
    this.pages.forEach((page, index) => {
      if (page.key === key) {
=======
    let pageIndex = this.page;
    this.pages.forEach((page, index) => {
      if (page.component.key === key) {
>>>>>>> upstream/master
        pageIndex = index;
        return false;
      }
    });
    return pageIndex;
  }

<<<<<<< HEAD
  addGlobalComponents(page) {
    // If there are non-page components, then add them here. This is helpful to allow for hidden fields that
    // can propogate between pages.
    if (this.globalComponents.length) {
      page.components = this.globalComponents.concat(page.components);
    }
    return page;
  }

  getPage(pageNum) {
    if ((pageNum >= 0) && (pageNum < this.pages.length)) {
      return this.addGlobalComponents(this.pages[pageNum]);
    }
    return null;
  }

  getWizard() {
    let pageIndex = 0;
    let page = null;
    const wizard = _.clone(this.wizard);
    wizard.components = [];
    do {
      page = this.getPage(pageIndex);

      if (page) {
        wizard.components.push(page);
      }

      pageIndex = this.getNextPage(this.submission.data, pageIndex);
    } while (pageIndex);

    // Add all other components.
    this.wizard.components.forEach((component) => {
      if (component.type !== 'panel') {
        wizard.components.push(component);
      }
    });

    return wizard;
  }

  currentPage() {
    return this.getPage(this.page);
  }

  buildPages(form) {
    this.pages = [];
    form.components.forEach((component) => {
      if (component.type === 'panel') {
        // Ensure that this page can be seen.
        if (checkCondition(component, this.data, this.data, this.wizard, this)) {
          this.pages.push(component);
        }
      }
      else if (component.type === 'hidden') {
        // Global components are hidden components that can propagate between pages.
        this.globalComponents.push(component);
      }
    });
    this.buildWizardHeader();
    this.buildWizardNav();
  }

=======
>>>>>>> upstream/master
  get schema() {
    return this.wizard;
  }

  setForm(form) {
    if (!form) {
      return;
    }
    this.wizard = form;
    this.component.components = form.components || [];

    // Check if there are no panel components.
    if (this.component.components.filter(component => component.type === 'panel').length === 0) {
      this.component.components = [
        {
          type: 'panel',
          title: 'Page 1',
          label: 'Page 1',
          key: 'page1',
          components: this.component.components
        }
      ];
    }

    this.originalComponents = _.cloneDeep(this.component.components);

    return super.setForm(form);
  }

  setValue(submission, flags) {
    const changed = super.setValue(submission, flags);
    this.pageFieldLogic(this.page);
    return changed;
  }

<<<<<<< HEAD
  hasButton(name, nextPage) {
    // Check for and initlize button settings object
    const currentPage = this.currentPage();

    this.options.buttonSettings = _.defaults(this.options.buttonSettings, {
      showPrevious: true,
      showNext: true,
      showCancel: !this.options.readOnly
    });
=======
  isClickable(page, index) {
    return this.page !== index && firstNonNil([
      _.get(page, 'breadcrumbClickable'),
      this.options.breadcrumbSettings.clickable
    ]);
  }
>>>>>>> upstream/master

  hasButton(name, nextPage) {
    const currentPage = this.currentPage;
    if (name === 'previous') {
      const show = firstNonNil([
        _.get(currentPage, 'buttonSettings.previous'),
        this.options.buttonSettings.showPrevious
      ]);
      return (this.page > 0) && show;
    }
    nextPage = (nextPage === undefined) ? this.getNextPage() : nextPage;
    if (name === 'next') {
      const show = firstNonNil([
        _.get(currentPage, 'buttonSettings.next'),
        this.options.buttonSettings.showNext
      ]);
      return (nextPage !== null) && (nextPage < this.pages.length) && show;
    }
    if (name === 'cancel') {
      return firstNonNil([
        _.get(currentPage, 'buttonSettings.cancel'),
        this.options.buttonSettings.showCancel
      ]);
    }
    if (name === 'submit') {
      const show = firstNonNil([
        _.get(currentPage, 'buttonSettings.submit'),
        this.options.buttonSettings.showSubmit
      ]);
      return show && !this.options.readOnly && ((nextPage === null) || (this.page === (this.pages.length - 1)));
    }
    return true;
  }

<<<<<<< HEAD
  buildWizardHeader() {
    if (this.wizardHeader) {
      this.wizardHeader.innerHTML = '';
    }

    const currentPage = this.currentPage();
    if (!currentPage || this.wizard.full) {
      return;
    }

    currentPage.breadcrumb = currentPage.breadcrumb || 'default';
    if (currentPage.breadcrumb.toLowerCase() === 'none') {
      return;
    }

    // Check for and initlize breadcrumb settings object
    this.options.breadcrumbSettings = _.defaults(this.options.breadcrumbSettings, {
      clickable: true
    });

    this.wizardHeader = this.ce('nav', {
      'aria-label': 'navigation'
    });

    this.wizardHeaderList = this.ce('ul', {
      class: 'pagination'
    });

    this.wizardHeader.appendChild(this.wizardHeaderList);

    // Add the header to the beginning.
    this.prepend(this.wizardHeader);

    const showHistory = (currentPage.breadcrumb.toLowerCase() === 'history');
    this.pages.forEach((page, i) => {
      // Iterate over predicates and returns first non-undefined value
      const clickableFlag = firstNonNil([
        // Now page (Panel) can override `breadcrumbSettings.clickable` option
        _.get(page, 'breadcrumbClickable'),
        // Set clickable based on breadcrumb settings
        this.options.breadcrumbSettings.clickable
      ]);

      const clickable = this.page !== i && clickableFlag;
      let pageClass = 'page-item ';
      pageClass += (i === this.page) ? 'active' : (clickable ? '' : 'disabled');

      const pageButton = this.ce('li', {
        class: pageClass,
        style: (clickable) ? 'cursor: pointer;' : ''
      });

      // Navigate to the page as they click on it.

      if (clickable) {
        this.addEventListener(pageButton, 'click', (event) => {
          this.emit('wizardNavigationClicked', this.pages[i]);
          event.preventDefault();
          this.setPage(i);
        });
      }

      const pageLabel = this.ce('span', {
        class: 'page-link'
      });
      let pageTitle = page.title;
      if (currentPage.breadcrumb.toLowerCase() === 'condensed') {
        pageTitle = ((i === this.page) || showHistory) ? page.title : (i + 1);
        if (!pageTitle) {
          pageTitle = (i + 1);
        }
      }

      pageLabel.appendChild(this.text(pageTitle));
      pageButton.appendChild(pageLabel);
      this.wizardHeaderList.appendChild(pageButton);
    });
  }

=======
>>>>>>> upstream/master
  pageId(page) {
    if (page.key) {
      // Some panels have the same key....
      return `${page.key}-${page.title}`;
    }
    else if (
      page.components &&
      page.components.length > 0
    ) {
      return this.pageId(page.components[0]);
    }
    else {
      return page.title;
    }
  }

  onChange(flags, changed) {
    super.onChange(flags, changed);

<<<<<<< HEAD
    // Only rebuild if there is a page change.
    let pageIndex = 0;
    let rebuild = false;
    this.wizard.components.forEach((component) => {
      if (component.type !== 'panel') {
        return;
      }

      if (hasCondition(component)) {
        const hasPage = this.pages && this.pages[pageIndex]
          && (this.pageId(this.pages[pageIndex]) === this.pageId(component));
        const shouldShow = checkCondition(component, this.data, this.data, this.wizard, this);
        if ((shouldShow && !hasPage) || (!shouldShow && hasPage)) {
          rebuild = true;
          return false;
        }
        if (shouldShow) {
          pageIndex++;
        }
      }
      else {
        pageIndex++;
      }
    });

    if (rebuild) {
      this.setForm(this.wizard);
=======
    // If the next page changes, then make sure to redraw navigation.
    if (this.currentNextPage !== this.getNextPage()) {
      this.redrawNavigation();
>>>>>>> upstream/master
    }

    // If the pages change, need to redraw the header.
    const currentPanels = this.pages.map(page => page.component.key);
    const panels = this.establishPages().map(panel => panel.key);
    if (!_.isEqual(panels, currentPanels)) {
      this.redrawHeader();
    }
  }

  checkValidity(data, dirty, currentPageOnly) {
    if (!this.checkCondition(null, data)) {
      this.setCustomValidity('');
      return true;
    }

    const components = !currentPageOnly || this.isLastPage()
      ? this.getComponents()
      : this.currentPage.components;

    return components.reduce(
      (check, comp) => comp.checkValidity(data, dirty) && check,
      true
    );
  }

  get errors() {
    if (!this.isLastPage()) {
      return this.currentPage.errors;
    }
<<<<<<< HEAD
    this.wizardNav = this.ce('ul', {
      class: 'list-inline'
    });
    this.element.appendChild(this.wizardNav);
    [
      { name: 'cancel',    method: 'cancel',   class: 'btn btn-default btn-secondary' },
      { name: 'previous',  method: 'prevPage', class: 'btn btn-primary' },
      { name: 'next',      method: 'nextPage', class: 'btn btn-primary' },
      { name: 'submit',    method: 'submit',   class: 'btn btn-primary' }
    ].forEach((button) => {
      if (!this.hasButton(button.name, nextPage)) {
        return;
      }
      const buttonWrapper = this.ce('li', {
        class: 'list-inline-item'
      });
      const buttonProp = `${button.name}Button`;
      const buttonElement = this[buttonProp] = this.ce('button', {
        class: `${button.class} btn-wizard-nav-${button.name}`
      });
      buttonElement.appendChild(this.text(this.t(button.name)));
      this.addEventListener(this[buttonProp], 'click', (event) => {
        event.preventDefault();
=======
>>>>>>> upstream/master

    return super.errors;
  }

  checkCurrentPageValidity(...args) {
    return super.checkValidity(...args);
  }

  checkPagesValidity(pages, ...args) {
    const isValid = Base.prototype.checkValidity.apply(this, args);
    return pages.reduce((check, pageComp) => {
      return pageComp.checkValidity(...args) && check;
    }, isValid);
  }

  checkValidity(data, dirty) {
    if (this.submitting) {
      return this.checkPagesValidity(this.getPages(), data, dirty);
    }
    else {
      return this.checkCurrentPageValidity(data, dirty);
    }
  }

  get errors() {
    if (this.isLastPage()) {
      const pages = this.getPages({ all: true });

      this.checkPagesValidity(pages, this.submission.data, true);

      return pages.reduce((errors, pageComp) => {
        return errors.concat(pageComp.errors || []);
      }, []);
    }

    return super.errors;
  }
}

Wizard.setBaseUrl = Formio.setBaseUrl;
Wizard.setApiUrl = Formio.setApiUrl;
Wizard.setAppUrl = Formio.setAppUrl;
