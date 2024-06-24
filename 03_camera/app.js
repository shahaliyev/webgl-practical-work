onload = () => {
    let canvas = document.getElementById('canvas');

    let gl = WebGLUtils.setupWebGL(canvas);

    if (!gl) {
        alert('error in loading gl');
        return;
    }
    
    let program = initShaders(gl, 'vertex-shader', 'fragment-shader');
    gl.useProgram(program);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.clearColor(0, 0, 1, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);

    let vertices = [
        -0.5, -0.5, 0.5,
        -0.5, 0.5, 0.5,
        0.5, 0.5, 0.5,
        0.5, -0.5, 0.5,
        -0.5, -0.5, -0.5,
        -0.5, 0.5, -0.5,
        0.5, 0.5, -0.5,
        0.5, -0.5, -0.5,
    ];

    let indices = [
        0, 3, 1,
        1, 3, 2,
        4, 7, 5,
        5, 7, 6,
        3, 7, 2,
        2, 7, 6,
        4, 0, 5,
        5, 0, 1, 
        1, 2, 5,
        5, 2, 6,
        0, 3, 4,
        4, 3, 7,
    ];

    let colors = [
        0, 0, 0,
        0, 0, 1,
        0, 1, 0,
        0, 1, 1,
        1, 0, 0,
        1, 0, 1,
        1, 1, 0,
        1, 1, 1,
    ];

    let iBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), gl.STATIC_DRAW);

    let vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    let vPosition = gl.getAttribLocation(program, 'vPosition');
    gl.vertexAttribPointer(vPosition,3,gl.FLOAT,gl.FALSE,0,0,);
    gl.enableVertexAttribArray(vPosition);

    let cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    let vColor = gl.getAttribLocation(program, 'vColor');
    gl.vertexAttribPointer(vColor,3,gl.FLOAT,gl.FALSE,0,0,);
    gl.enableVertexAttribArray(vColor);

    let eye = [0, 0, 0];
    let at = [1, 1, 1];
    let up = [0.5, 0.5, 0];

    let ctm = lookAt(eye, at, up);
    // ctm = mult(ctm, translate(-0.2, 0, 0));
    // ctm = mult(ctm, rotateZ(45));

    let mvm = gl.getUniformLocation(program, 'mvm');
    gl.uniformMatrix4fv(mvm, gl.FALSE, flatten(ctm));

    gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_BYTE, 0);
}