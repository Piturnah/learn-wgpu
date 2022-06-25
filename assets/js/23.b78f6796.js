(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{529:function(e,t,n){e.exports=n.p+"assets/img/figure_no-fbm.1931fe05.png"},530:function(e,t,n){e.exports=n.p+"assets/img/figure_fbm.28310498.png"},531:function(e,t,n){e.exports=n.p+"assets/img/figure_spiky.46babb7a.png"},532:function(e,t,n){e.exports=n.p+"assets/img/figure_work-groups.af52f221.jpg"},591:function(e,t,n){"use strict";n.r(t);var a=n(23),o=Object(a.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"procedural-terrain"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#procedural-terrain"}},[e._v("#")]),e._v(" Procedural Terrain")]),e._v(" "),a("p",[e._v("Up to this point we've been working in an empty void. This is great when you want to get your shading code just right, but most applications will want to fill the screen more interesting things. You could aproach this in a variety of ways. You could create a bunch of models in Blender and load them into the scene. This method works great if you have some decent artistic skills, and some patience. I'm lacking in both those departments, so let's write some code to make something that looks nice.")]),e._v(" "),a("p",[e._v("As the name of this article suggests we're going to create a terrain. Now the traditional method to create a terrain mesh is to use a pre-generated noise texture and sampling it to get the height values at each point in the mesh. This is a perfectly valid way to approach this, but I opted to generate the noise using a Compute Shader directly. Let's get started!")]),e._v(" "),a("h2",{attrs:{id:"compute-shaders"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#compute-shaders"}},[e._v("#")]),e._v(" Compute Shaders")]),e._v(" "),a("p",[e._v("A compute shader is simply a shader that allows you to leverage the GPU's parallel computing power for arbitrary tasks. You can use them for anything from creating a texture to running a neural network. I'll get more into how they work in a bit, but for now suffice to say that we're going to use them to create the vertex and index buffers for our terrain.")]),e._v(" "),a("div",{staticClass:"note"},[a("p",[e._v("As of writing, compute shaders are still experimental on the web. You can enable them on beta versions of browsers such as Chrome Canary and Firefox Nightly. Because of this I'll cover a method to use a fragment shader to compute the vertex and index buffers after we cover the compute shader method.")])]),e._v(" "),a("h2",{attrs:{id:"noise-functions"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#noise-functions"}},[e._v("#")]),e._v(" Noise Functions")]),e._v(" "),a("p",[e._v("Lets start with the shader code for the compute shader. First we'll create the noise functions, then we'll create the compute shader's entry function. Create a new file called "),a("code",[e._v("terrain.wgsl")]),e._v(". Then add the following:")]),e._v(" "),a("div",{staticClass:"language-wgsl extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("// ============================\n// Terrain Generation\n// ============================\n\n// https://gist.github.com/munrocket/236ed5ba7e409b8bdf1ff6eca5dcdc39\n//  MIT License. © Ian McEwan, Stefan Gustavson, Munrocket\n// - Less condensed glsl implementation with comments can be found at https://weber.itn.liu.se/~stegu/jgt2012/article.pdf\n\nfn permute3(x: vec3<f32>) -> vec3<f32> { return (((x * 34.) + 1.) * x) % vec3<f32>(289.); }\n\nfn snoise2(v: vec2<f32>) -> f32 {\n  let C = vec4<f32>(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);\n  var i: vec2<f32> = floor(v + dot(v, C.yy));\n  let x0 = v - i + dot(i, C.xx);\n  // I flipped the condition here from > to < as it fixed some artifacting I was observing\n  var i1: vec2<f32> = select(vec2<f32>(1., 0.), vec2<f32>(0., 1.), (x0.x < x0.y));\n  var x12: vec4<f32> = x0.xyxy + C.xxzz - vec4<f32>(i1, 0., 0.);\n  i = i % vec2<f32>(289.);\n  let p = permute3(permute3(i.y + vec3<f32>(0., i1.y, 1.)) + i.x + vec3<f32>(0., i1.x, 1.));\n  var m: vec3<f32> = max(0.5 -\n      vec3<f32>(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), vec3<f32>(0.));\n  m = m * m;\n  m = m * m;\n  let x = 2. * fract(p * C.www) - 1.;\n  let h = abs(x) - 0.5;\n  let ox = floor(x + 0.5);\n  let a0 = x - ox;\n  m = m * (1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h));\n  let g = vec3<f32>(a0.x * x0.x + h.x * x0.y, a0.yz * x12.xz + h.yz * x12.yw);\n  return 130. * dot(m, g);\n}\n\n")])])]),a("p",[e._v("Some of my readers may recognize this as an implementation of Simplex noise (specifically OpenSimplex noise). I'll admit to not really understanding the math behind OpenSimplex noise. The basics of it are that it's similar to Perlin Noise, but instead of a square grid it's a hexagonal grid which removes some of the artifacts that generating the noise on a square grid gets you. Again I'm not an expert on this, so to summarize: "),a("code",[e._v("permute3()")]),e._v(" takes a "),a("code",[e._v("vec3")]),e._v(" and returns a pseudorandom "),a("code",[e._v("vec3")]),e._v(", "),a("code",[e._v("snoise2()")]),e._v(" takes a "),a("code",[e._v("vec2")]),e._v(" and returns a floating point number between [-1, 1]. If you want to learn more about noise functions, check out "),a("a",{attrs:{href:"https://thebookofshaders.com/11/",target:"_blank",rel:"noopener noreferrer"}},[e._v("this article from The Book of Shaders"),a("OutboundLink")],1),e._v(". The code's in GLSL, but the concepts are the same.")]),e._v(" "),a("p",[e._v("While we can use the output of "),a("code",[e._v("snoise")]),e._v(" directly to generate the terrains height values. The result of this tends to be very smooth, which may be what you want, but doesn't look very organic as you can see below:")]),e._v(" "),a("p",[a("img",{attrs:{src:n(529),alt:"smooth terrain"}})]),e._v(" "),a("p",[e._v("To make the terrain a bit rougher we're going to use a technique called "),a("a",{attrs:{href:"https://thebookofshaders.com/13/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Fractal Brownian Motion"),a("OutboundLink")],1),e._v(". This technique works by sampling the noise function multiple times cutting the strength in half each time while doubling the frequency of the noise. This means that the overall shape of the terrain will be fairly smooth, but it will have sharper details. You can see what that will look like below:")]),e._v(" "),a("p",[a("img",{attrs:{src:n(530),alt:"more organic terrain"}})]),e._v(" "),a("p",[e._v("The code for this function is actually quite simple:")]),e._v(" "),a("div",{staticClass:"language-wgsl extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("fn fbm(p: vec2<f32>) -> f32 {\n    let NUM_OCTAVES: u32 = 5u;\n    var x = p * 0.01;\n    var v = 0.0;\n    var a = 0.5;\n    let shift = vec2<f32>(100.0);\n    let cs = vec2<f32>(cos(0.5), sin(0.5));\n    let rot = mat2x2<f32>(cs.x, cs.y, -cs.y, cs.x);\n\n    for (var i=0u; i<NUM_OCTAVES; i=i+1u) {\n        v = v + a * snoise2(x);\n        x = rot * x * 2.0 + shift;\n        a = a * 0.5;\n    }\n\n    return v;\n}\n")])])]),a("p",[e._v("Let's go over some this a bit:")]),e._v(" "),a("ul",[a("li",[e._v("The "),a("code",[e._v("NUM_OCTAVES")]),e._v(" constant is the number of levels of noise you want. More octaves will add more texture to the terrain mesh, but you'll get diminishing returns at higher levels. I find that 5 is a good number.")]),e._v(" "),a("li",[e._v("We multiple "),a("code",[e._v("p")]),e._v(" by "),a("code",[e._v("0.01")]),e._v(' to "zoom in" on the noise function. This is because as our mesh will be 1x1 quads and the simplex noise function resembles white noise when stepping by one each time. You can see what that looks like to use '),a("code",[e._v("p")]),e._v(" directly: "),a("img",{attrs:{src:n(531),alt:"spiky terrain"}})]),e._v(" "),a("li",[e._v("The "),a("code",[e._v("a")]),e._v(" variable is the amplitude of the noise at the given noise level.")]),e._v(" "),a("li",[a("code",[e._v("shift")]),e._v(" and "),a("code",[e._v("rot")]),e._v(" are used to reduce artifacts in the generated noise. One such artiface is that at "),a("code",[e._v("0,0")]),e._v(" the output of the "),a("code",[e._v("snoise")]),e._v(" will always be the same regardless of how much you scale "),a("code",[e._v("p")]),e._v(".")])]),e._v(" "),a("h2",{attrs:{id:"generating-the-mesh"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#generating-the-mesh"}},[e._v("#")]),e._v(" Generating the mesh")]),e._v(" "),a("p",[e._v("To generate the terrain mesh we're going to need to pass some information into the shader:")]),e._v(" "),a("div",{staticClass:"language-wgsl extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("struct ChunkData {\n    chunk_size: vec2<u32>;\n    chunk_corner: vec2<i32>;\n    min_max_height: vec2<f32>;\n};\n\nstruct Vertex {\n    [[location(0)]] position: vec3<f32>;\n    [[location(1)]] normal: vec3<f32>;\n};\n\nstruct VertexBuffer {\n    data: [[stride(32)]] array<Vertex>;\n};\n\nstruct IndexBuffer {\n    data: array<u32>;\n};\n\n[[group(0), binding(0)]] var<uniform> chunk_data: ChunkData;\n[[group(0), binding(1)]] var<storage, read_write> vertices: VertexBuffer;\n[[group(0), binding(2)]] var<storage, read_write> indices: IndexBuffer;\n")])])]),a("p",[e._v("Our shader will expect a "),a("code",[e._v("uniform")]),e._v(" buffer that includes the size of the quad grid in "),a("code",[e._v("chunk_size")]),e._v(", the "),a("code",[e._v("chunk_corner")]),e._v(" that our noise algorithm should start at, and "),a("code",[e._v("min_max_height")]),e._v(" of the terrain.")]),e._v(" "),a("p",[e._v("The vertex and index buffers are passed in as "),a("code",[e._v("storage")]),e._v(" buffers with "),a("code",[e._v("read_write")]),e._v(" enabled. We'll create the actual buffers in Rust and bind them when we execute the compute shader.")]),e._v(" "),a("p",[e._v("The next part of the shader will be the functions that generate a point on the mesh, and a vertex at that point:")]),e._v(" "),a("div",{staticClass:"language-wgsl extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("fn terrain_point(p: vec2<f32>) -> vec3<f32> {\n    return vec3<f32>(\n        p.x,\n        mix(chunk_data.min_max_height.x,chunk_data.min_max_height.y, fbm(p)),\n        p.y,\n    );\n}\n\nfn terrain_vertex(p: vec2<f32>) -> Vertex {\n    let v = terrain_point(p);\n\n    let tpx = terrain_point(p + vec2<f32>(0.1, 0.0)) - v;\n    let tpz = terrain_point(p + vec2<f32>(0.0, 0.1)) - v;\n    let tnx = terrain_point(p + vec2<f32>(-0.1, 0.0)) - v;\n    let tnz = terrain_point(p + vec2<f32>(0.0, -0.1)) - v;\n\n    let pn = normalize(cross(tpz, tpx));\n    let nn = normalize(cross(tnz, tnx));\n\n    let n = (pn + nn) * 0.5;\n\n    return Vertex(v, n);\n}\n")])])]),a("p",[e._v("The "),a("code",[e._v("terrain_point")]),e._v(" function takes an XZ point on the terrain and returns a "),a("code",[e._v("vec3")]),e._v(" with the "),a("code",[e._v("y")]),e._v(" value between the min and max height values.")]),e._v(" "),a("p",[a("code",[e._v("terrain_vertex")]),e._v(" uses "),a("code",[e._v("terrain_point")]),e._v(" to get it's position and also to compute of the normal of the surface by sampling 4 nearby points and uses them to compute the normal using some "),a("a",{attrs:{href:"https://www.khanacademy.org/math/multivariable-calculus/thinking-about-multivariable-function/x786f2022:vectors-and-matrices/a/cross-products-mvc",target:"_blank",rel:"noopener noreferrer"}},[e._v("cross products"),a("OutboundLink")],1),e._v(".")]),e._v(" "),a("div",{staticClass:"note"},[a("p",[e._v("You'll notice that our "),a("code",[e._v("Vertex")]),e._v(" struct doesn't include a texture coordinate. We could easily create texture coordinates by using the XZ coords of the vertices and having the texture sampler mirror the texture on the x and y axes, but heightmaps tend to have stretching when textured in this way.")]),e._v(" "),a("p",[e._v("We'll cover a method called triplanar mapping to texture the terrain in a future tutorial. For now we'll just use a procedural texture that will create in the fragment shader we use to render the terrain.")])]),e._v(" "),a("p",[e._v("Now that we can get a vertex on the terrains surface we can fill our vertex and index buffers with actual data. We'll create a "),a("code",[e._v("gen_terrain()")]),e._v(" function that will be the entry point for our compute shader:")]),e._v(" "),a("div",{staticClass:"language-wgsl extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("[[stage(compute), workgroup_size(64)]]\nfn gen_terrain(\n    [[builtin(global_invocation_id)]] gid: vec3<u32>\n) {\n    // snipped...\n}\n")])])]),a("p",[e._v("We specify that "),a("code",[e._v("gen_terrain")]),e._v(" is a compute shader entry point by annotating it with "),a("code",[e._v("stage(compute)")]),e._v(".")]),e._v(" "),a("p",[e._v("The "),a("code",[e._v("workgroup_size()")]),e._v(" is the number of workers that the GPU can allocate per "),a("code",[e._v("workgroup")]),e._v(". We specify the number of workers when we execute the compute shader. There are technically 3 parameters to this as work groups are a 3d grid, but if you don't specify them they default to 1. In other words "),a("code",[e._v("workgroup_size(64)")]),e._v(" is equivalent to "),a("code",[e._v("workgroup_size(64, 1, 1)")]),e._v(".")]),e._v(" "),a("p",[e._v("The "),a("code",[e._v("global_invocation_id")]),e._v(" is a 3d index. This may seem weird, but you can think of work groups as a 3d grid of work groups. These workgroups have an internal grid of workers. The "),a("code",[e._v("global_invocation_id")]),e._v(" is the id of the current worker relative to all the other works.")]),e._v(" "),a("p",[e._v("Visually the workgroup grid would look something like this:")]),e._v(" "),a("p",[a("img",{attrs:{src:n(532),alt:"work group grid"}})]),e._v(" "),a("div",{staticClass:"note"},[a("p",[e._v("It may be helpful to think of a compute shader as a function that is run in a bunch of nested for loops, but each loop is executed in parallel. It would look something like this:")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("for wgx in num_workgroups.x:\n    for wgy in num_workgroups.y:\n        for wgz in num_workgroups.z:\n            var local_invocation_id = (wgx, wgy, wgz)\n            for x in workgroup_size.x:\n                for y in workgroup_size.x:\n                    for z in workgroup_size.x:\n                        var global_invocation_id = local_invocation_id * workgroup_size + (x, y, z);\n                        gen_terrain(global_invocation_id)\n\n")])])]),a("p",[e._v("If you want learn more about workgroups "),a("a",{attrs:{href:"https://www.w3.org/TR/WGSL/#compute-shader-workgroups",target:"_blank",rel:"noopener noreferrer"}},[e._v("check out the docs"),a("OutboundLink")],1),e._v(".")])]),e._v(" "),a("p",[e._v("TODO:")]),e._v(" "),a("ul",[a("li",[e._v("Note changes to "),a("code",[e._v("create_render_pipeline")])]),e._v(" "),a("li",[e._v("Mention "),a("code",[e._v("swizzle")]),e._v(" feature for cgmath")]),e._v(" "),a("li",[e._v("Compare workgroups and workgroups sizes to nested for loops\n"),a("ul",[a("li",[e._v("Maybe make a diagram in blender?")])])]),e._v(" "),a("li",[e._v("Change to camera movement speed")])])])}),[],!1,null,null,null);t.default=o.exports}}]);