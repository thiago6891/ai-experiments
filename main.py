#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
import jinja2
import os
import webapp2

template_dir = os.path.join(os.path.dirname(__file__), "templates")
jinja_env = jinja2.Environment(
    loader = jinja2.FileSystemLoader(template_dir),
    autoescape = True)

class BaseHandler(webapp2.RequestHandler):
    
    def write(self, *a, **kw):
        self.response.out.write(*a, **kw)
        
    def render_str(self, file_name, **params):
        template = jinja_env.get_template(file_name)
        return template.render(params)
        
    def render(self, file_name, **kw):
        self.write(self.render_str(file_name, **kw))
        

class MainHandler(BaseHandler):
    def get(self):
        self.render("main.html", title = "AI Experiments")

class SearchHandler(BaseHandler):
    def get(self):
        self.render("search.html", title = "AI Experiments - Search")

class SlidePuzzleHandler(BaseHandler):
    def get(self):
        self.render("slide-puzzle.html", title = "AI Experiments - Slide Puzzle")


app = webapp2.WSGIApplication([
    ('/', MainHandler),
    ('/search', SearchHandler),
    # search.html should be kept since the page was initially served statically
    # maybe in the future it can be removed. (March, 25, 2014)
    ('/search.html', SearchHandler),
    ('/slide-puzzle', SlidePuzzleHandler)
], debug=True)
